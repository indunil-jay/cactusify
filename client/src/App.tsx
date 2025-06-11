import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
    return (
        <GoogleOAuthProvider clientId="906785104671-k9qvcfc7bd5ion1p2i01sn4uam5tsoj7.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={(response) => {
                    console.log(response);
                    fetch("http://localhost:3000/authentication/google", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: response.credential,
                        }),
                    })
                        .then((response) => console.log({ response }))
                        .then((data) => console.log({ data }));
                }}
            />
        </GoogleOAuthProvider>
    );
}

export default App;
