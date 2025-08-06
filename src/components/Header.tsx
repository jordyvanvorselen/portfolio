export const Header = (): JSX.Element => {
	return (
		<header 
			role="banner" 
			className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between"
		>
			<a 
				href="/" 
				className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
			>
				Jordy van Vorselen
			</a>
			
			<nav className="flex items-center gap-8">
				<div className="flex items-center gap-6">
					<a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
					<a href="/expertise" className="text-gray-300 hover:text-white transition-colors">Expertise</a>
					<a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
					<a href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
					<a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
				</div>
				
				<div className="flex items-center gap-4">
					<a 
						href="https://github.com/jordyvanvorselen" 
						className="text-gray-400 hover:text-white transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					<a 
						href="https://linkedin.com/in/jordyvanvorselen" 
						className="text-gray-400 hover:text-white transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
					<button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
						Hire Me
					</button>
				</div>
			</nav>
		</header>
	);
};