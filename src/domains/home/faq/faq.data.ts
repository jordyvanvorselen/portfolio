export interface FaqItem {
  question: string
  answer: string
}

export const faqData: FaqItem[] = [
  {
    question: 'Are you available for new projects?',
    answer:
      'Yes, I am currently open to new opportunities and projects. Feel free to reach out to discuss how I can contribute to your team or project.',
  },
  {
    question: 'What is your hourly rate?',
    answer: 'My hourly rate is €95,00 per hour.',
  },
  {
    question: 'Are you experienced with <Some Other Technology>?',
    answer:
      "As a freelancer and consultant I'm used to quickly mastering new technologies. While I may not have direct experience with <Some Other Technology>, I have a strong foundation in related technologies and a proven track record of learning and adapting quickly to new tools and frameworks. In the end it's the solid foundation of principles that matter, not the specific technology. A massive upside of this is that I can bring in fresh perspectives and innovative solutions to your project.",
  },
  {
    question: 'Do you work remotely?',
    answer:
      "Absolutely! I am a Dutch citizen, but I have extensive experience working with distributed teams across different time zones. I'm skilled in asynchronous communication, collaborative tools, and building strong remote working relationships. I believe that with the right tools and mindset, remote work can be way more effective than in-office work. I tend to work in the client's timezone as much as possible to facilitate real-time communication and collaboration. I'm very flexible — even US, Asian or Australian timezones might be no problem — so don't hesitate to contact me to speak about the possibilities.",
  },
  {
    question: 'I just want a bit of advice, can you help?',
    answer:
      'Definitely! I offer consulting services where I can provide expert advice on software architecture, technology selection, project management, and best practices. Whether you need a one-time consultation or ongoing support, I am here to help you make informed decisions and achieve your project goals.',
  },
  {
    question:
      "I'm a startup and I don't have a big budget. Can you still help?",
    answer:
      "Absolutely! I understand the challenges startups face, and I am committed to helping you succeed. I offer flexible pricing options and can work with you to find a solution that fits your budget while still delivering high-quality results. Let's discuss your needs and see how we can collaborate effectively.",
  },
]
