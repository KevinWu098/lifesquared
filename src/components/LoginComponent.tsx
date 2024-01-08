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
        <>
            {user ? (
                <LogoutLink className="w-fit">
                    <Button
                        className="w-100 text-base border-2"
                        variant={"outline"}
                    >
                        Logout
                    </Button>
                </LogoutLink>
            ) : (
                <LoginLink className="w-fit">
                    <Button
                        className="w-100 text-base border-2"
                        variant={"outline"}
                    >
                        Sign in to create saved Calendar
                    </Button>
                </LoginLink>
            )}
        </>
    );
};

export default LoginComponent;
