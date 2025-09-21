// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Icon } from "@/components/ui/icon";

// export default function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // In a real app, you'd handle authentication here
//     console.log("Login with:", { email, password });
//     navigate("/location");
//   };

//   const handleSocialLogin = (provider: "google" | "facebook") => {
//     // In a real app, you'd handle social authentication here
//     console.log(`Login with ${provider}`);
//     navigate("/location");
//   };

//   return (
//     <div className="relative flex size-full min-h-screen flex-col justify-between overflow-x-hidden bg-warm-background">
//       <div className="flex flex-col p-6 space-y-8">
//         {/* Header */}
//         <header className="flex items-center justify-between">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => navigate(-1)}
//             className="text-foreground p-2"
//           >
//             <Icon name="arrow_back_ios_new" />
//           </Button>
//           <h1 className="text-foreground text-xl font-bold font-display">Log In</h1>
//           <div className="w-10" />
//         </header>

//         {/* Welcome Section */}
//         <div className="text-center">
//           <h2 className="text-foreground text-4xl font-bold tracking-tight font-display">
//             Welcome Back!
//           </h2>
//           <p className="text-muted-foreground mt-2">
//             Log in to report issues and build a better Jharkhand.
//           </p>
//         </div>

//         {/* Form */}
//         <div className="space-y-4">
//           <div className="relative">
//             <Icon 
//               name="alternate_email" 
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
//             />
//             <Input
//               type="text"
//               placeholder="Email or Phone"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full rounded-xl border-none bg-muted h-14 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
//             />
//           </div>
//           <div className="relative">
//             <Icon 
//               name="lock" 
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full rounded-xl border-none bg-muted h-14 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
//             />
//           </div>
//           <button className="block text-right text-sm font-medium text-foreground hover:underline w-full">
//             Forgot Password?
//           </button>
//         </div>

//         {/* Login Button */}
//         <Button
//           onClick={handleLogin}
//           className="flex w-full h-14 px-5 civic-gradient text-white text-lg font-bold tracking-wider civic-shadow hover:opacity-90 transition-all duration-300"
//         >
//           Login
//         </Button>

//         {/* Divider */}
//         <div className="relative flex items-center justify-center">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-border" />
//           </div>
//           <div className="relative bg-warm-background px-4 text-sm text-muted-foreground">
//             Or log in with
//           </div>
//         </div>

//         {/* Social Login */}
//         <div className="flex gap-4">
//           <Button
//             onClick={() => handleSocialLogin("google")}
//             variant="outline"
//             className="flex flex-1 items-center justify-center gap-2 h-12 px-4 bg-background border border-border text-foreground text-base font-semibold hover:bg-muted transition-colors"
//           >
//             <svg className="h-5 w-5" viewBox="0 0 48 48">
//               <path
//                 d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
//                 fill="#FFC107"
//               />
//               <path
//                 d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
//                 fill="#FF3D00"
//               />
//               <path
//                 d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
//                 fill="#4CAF50"
//               />
//               <path
//                 d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.258,44,34,44,30C44,22.659,43.862,21.35,43.611,20.083z"
//                 fill="#1976D2"
//               />
//             </svg>
//             <span>Google</span>
//           </Button>
//           <Button
//             onClick={() => handleSocialLogin("facebook")}
//             variant="outline"
//             className="flex flex-1 items-center justify-center gap-2 h-12 px-4 bg-background border border-border text-foreground text-base font-semibold hover:bg-muted transition-colors"
//           >
//             <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.878V14.89h-2.54V12h2.54V9.797c0-2.506,1.492-3.89,3.777-3.89c1.094,0,2.238.195,2.238.195v2.46h-1.26c-1.24,0-1.628.772-1.628,1.562V12h2.773l-.443,2.89h-2.33V21.878C18.343,21.128,22,16.99,22,12Z" />
//             </svg>
//             <span>Facebook</span>
//           </Button>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="pb-8 pt-4 text-center">
//         <p className="text-muted-foreground text-sm">
//           Don't have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="font-bold text-primary hover:underline"
//           >
//             Sign Up
//           </button>
//         </p>
//       </footer>
//     </div>
//   );
// }