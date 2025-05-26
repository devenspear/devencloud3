export default function Contact() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
        <div className="text-center">
          <p className="text-lg mb-4">Get in touch with me</p>
          <a 
            href="mailto:contact@example.com" 
            className="text-[#8fffaa] hover:text-[#7ee89a] transition-colors"
          >
            contact@example.com
          </a>
        </div>
      </div>
    </section>
  )
}
 