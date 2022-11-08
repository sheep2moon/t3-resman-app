import Image from "next/image";
import React from "react";
import logoSrc from "../../../../assets/logo.png";

const Logo = () => {
    return (
        <div className="flex items-center gap-1">
            <div className="relative h-10 w-10">
                <Image src={logoSrc} alt="logo strony" layout="fill" />
            </div>
            <span>Places</span>
        </div>
    );
};

export default Logo;