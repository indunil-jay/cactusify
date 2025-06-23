import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { Product } from 'src/products/domain/product';
import { CreateProductRepository } from '../../ports/repositories/create-product.repository';
import { ProductFactory } from 'src/products/domain/factories/product.factory';
import { ProductCreatedEvent } from 'src/products/domain/events/product-created.event';
import { UploadService } from 'src/shared/application/ports/upload.service';
import { IUploadedFilePayload } from 'src/shared/application/interfaces/uploaded-file-payload.interface';
import { FileTypes } from 'src/shared/application/enums/file-types.enum';
import { Inject } from '@nestjs/common';
import awsConfig from 'src/core/config/aws.config';
import { ConfigType } from '@nestjs/config';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly createProductRepository: CreateProductRepository,
    private readonly productFactory: ProductFactory,
    private readonly eventBus: EventBus,
    private readonly uploadService: UploadService,
    @Inject(awsConfig.KEY)
    private readonly awsConfiguration: ConfigType<typeof awsConfig>,
  ) {}
  async execute({
    name,
    price,
    quantity,
    isActive,
    description,
    ageInMonths,
    userId,
    size,
    discountPrice,
    slug,
    scientificName,
    images,
  }: CreateProductCommand): Promise<Product> {
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const name = await this.uploadService.uploadFile(image);
        //create upload entity shape
        const uploaded: IUploadedFilePayload = {
          name: name,
          path: `${this.awsConfiguration.cloudFrontUrl}/${name}`,
          type: FileTypes.IMAGE,
          mime: image.mimetype,
          size: image.size,
        };

        return uploaded;
      }),
    );

    const product = this.productFactory.create(
      uploadedImages,
      name,
      price,
      quantity,
      isActive,
      description,
      ageInMonths,
      userId,
      size,
      discountPrice,
      scientificName,
      slug,
    );
    const newProduct = await this.createProductRepository.save(product);
    this.eventBus.publish(new ProductCreatedEvent(newProduct));
    return newProduct;
  }
}
