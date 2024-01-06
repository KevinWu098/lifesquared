import React from "react";
import {
    getKindeServerSession,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

import { Button } from "@/components/ui/button";

const LoginComponent = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <div>
            {user ? (
                <>
                    <div>User: {user.given_name}</div>
                    <LogoutLink>Logout</LogoutLink>
                </>
            ) : (
                <LoginLink>
                    <Button className="w-full text-base" variant={"link"}>
                        Sign in
                    </Button>
                </LoginLink>
            )}
        </div>
    );
};

export default LoginComponent;
