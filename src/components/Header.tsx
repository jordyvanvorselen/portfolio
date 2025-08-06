import { Github, Linkedin, UserPlus } from "lucide-react";

export const Header = (): JSX.Element => {
	return (
		<header 
			role="banner" 
			className="bg-gray-900 text-white px-12 py-4"
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<a 
					href="/" 
					className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
				>
					Jordy van Vorselen
				</a>
				
				<nav className="absolute left-1/2 transform -translate-x-1/2">
					<div className="flex items-center gap-8">
						<a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
						<a href="/expertise" className="text-gray-300 hover:text-white transition-colors">Expertise</a>
						<a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
						<a href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
						<a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
					</div>
				</nav>
				
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-4">
						<a 
							href="https://github.com/jordyvanvorselen" 
							className="text-gray-400 hover:text-white transition-colors"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<Github className="w-5 h-5" />
						</a>
						<a 
							href="https://linkedin.com/in/jordyvanvorselen" 
							className="text-gray-400 hover:text-white transition-colors"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
						>
							<Linkedin className="w-5 h-5" />
						</a>
					</div>
					
					<div className="w-px h-6 bg-gray-600"></div>
					
					<button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
						<UserPlus className="w-4 h-4" />
						Hire Me
					</button>
				</div>
			</div>
		</header>
	);
};