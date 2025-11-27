import Linkedin from "../assets/Linkedin.json";
import GitHubLogo from "../assets/GitHubLogo.json";
import Whatsapp from "../assets/Whatsapp.json";
import Call from "../assets/Call.json";
import Mail from "../assets/Mail.json";
import Lottie from "lottie-react";

export const SocialLinks=()=>{
    <div className="flex gap-4 flex-wrap items-center">
        <a href="https://github.com/blast0" target="_blank" className="h-12 w-12 sm:h-14 sm:w-14">
          <Lottie animationData={GitHubLogo} loop />
        </a>
        <a href="https://linkedin.com/in/bishal-kumar-832398158" target="_blank" className="h-14 w-14 sm:h-16 sm:w-16">
          <Lottie animationData={Linkedin} loop />
        </a>
        <a href="mailto:bishalkumar.sde@gmail.com?cc=bishalkumar.coder@gmail.com&subject=Portfolio%20&body=Hello%20Bishal" className="h-14 w-14 sm:h-16 sm:w-16">
          <Lottie animationData={Mail} loop />
        </a>
        <div className="cursor-pointer h-12 w-12 sm:h-14 sm:w-14">
          <Lottie animationData={Whatsapp} loop />
        </div>
        <div className="cursor-pointer h-16 w-16 sm:h-20 sm:w-20">
          <Lottie animationData={Call} loop />
        </div>
    </div>  
}