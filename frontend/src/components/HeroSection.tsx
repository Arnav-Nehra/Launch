import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function HeroSection(){
const navigate = useNavigate();

    return (
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Now in v1
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    From commit to live
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        faster than ever
                    </span>
                    <br />
                    with Elevate
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                    Deploy faster than you can say 'npm run build'. 
                    Ship your code with confidence and watch it go live in seconds.
                </p>

               
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Button 
                        size="lg" 
                        className="pr-2 py-6 text-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={()=>navigate("/deploy")}
                    >
                        Try Now
                        <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Button>
                    <Link to={"https://github.com/Arnav-Nehra/Launch"} target="_blank">
                    <Button 
                        size="lg" 
                        variant="outline" 
                   
                    >
                    
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                    </Button></Link>
                </div>
                <div className="grid grid-cols-2  max-w-2xl mx-auto pt-8 border-t border-gray-200 dark:border-gray-700">
                   <datalist></datalist>
                    <div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">99.9%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Uptime</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">&lt;30s</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg Deploy</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
