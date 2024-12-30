import Image from 'next/image';

const testimonials = [
  {
    content: "ReList has been a game-changer for my boutique. I used to spend hours cross-posting items, but now it's all automated. Love it! 💕",
    author: "Sarah Chen",
    role: "Vintage Fashion Seller",
    avatar: "/avatars/sarah.jpg" // You'll need to add these images
  },
  {
    content: "The smart pricing feature helped me increase my sales by 40%. It's like having a personal business advisor!",
    author: "Emma Rodriguez",
    role: "Handmade Jewelry Artist",
    avatar: "/avatars/emma.jpg"
  },
  {
    content: "Finally, a platform that understands what sellers actually need. The interface is beautiful and so easy to use.",
    author: "Michelle Park",
    role: "Sustainable Fashion Seller",
    avatar: "/avatars/michelle.jpg"
  }
];

export function Testimonials() {
  return (
    <div className="bg-gradient-to-b from-white to-pink-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="text-pink-600 font-medium">Loved by sellers</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Join thousands of happy sellers
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            See what our community is saying about their ReList experience ✨
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.author} 
              className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <div className="absolute h-12 w-12 rounded-full bg-gradient-to-r from-pink-200 to-purple-200" />
                  {/* Placeholder for avatar - you'll need to add actual images */}
                </div>
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 