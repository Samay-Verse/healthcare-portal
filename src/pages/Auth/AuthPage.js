import React from "react";
import "./AuthPage.css";
import Iridescence from "../../components/Iridescence";

const LoginPage = () => {
  return (
    <div className="authpage-root">
      <Iridescence 
        className="auth-background"
        color={[0.2, 0.6, 1.0]}
        speed={0.8}
        amplitude={0.15}
        mouseReact={true}
      />
      <div className="container" aria-label="Empty card for background only">
        {/* Empty container, no left or right sections */}
      </div>
    </div>
  );
};

export default LoginPage;