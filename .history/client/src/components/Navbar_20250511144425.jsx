import React from "react";
import Logo from "../../src/assets/logo.svg";
import HerFutureLogo from "../../client/src/assets/herfuture.png"; // Corrected import path

const Navbar = () => {
return (
&lt;header
className="bg-white shadow-md py-4" // Keep other Tailwind classes
style={{ height: "120px" }} // Example: Set a fixed height of 120 pixels
>
&lt;div className="container mx-auto flex items-center justify-between px-4" style={{ height: "100%" }}> {/* Ensure inner div can fill the header /}
&lt;div className="flex items-center" style={{ height: "100%" }}> {/ Ensure logo and text are vertically centered /}
&lt;img
src={HerFutureLogo}
alt="Her Future Logo"
className="mr-2"
style={{ height: "80px" }} // Adjust image heights if needed
/>
&lt;img
src={Logo}
alt="Tuinue Wasichana Logo"
className="mr-2"
style={{ height: "80px" }} // Adjust image heights if needed
/>
&lt;h1 className="text-xl font-bold text-gray-800">Tuinue Wasichana&lt;/h1>
&lt;/div>
&lt;nav className="space-x-4" style={{ height: "100%", display: "flex", alignItems: "center" }}> {/ Vertically center navigation */}
&lt;a
href="/"
className="text-gray-600 hover:text-blue-500 transition duration-300"
>
Home
&lt;/a>
&lt;a
href="/about"
className="text-gray-600 hover:text-blue-500 transition duration-300"
>
About
&lt;/a>
&lt;a
href="/charities"
className="text-gray-600 hover:text-blue-500 transition duration-300"
>
Charities
&lt;/a>
&lt;a
href="/login"
className="text-gray-600 hover:text-blue-500 transition duration-300"
>
Login
&lt;/a>
&lt;/nav>
&lt;/div>
&lt;/header>
);
};

export default Navbar;