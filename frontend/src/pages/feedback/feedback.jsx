import React, { useState } from 'react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Add your form submission logic here

    const response = await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerName: name, feedbackText: feedback, rating }),
    });

    if (response.ok) {
      alert('Feedback submitted successfully');
    } else {
      alert('Failed to submit feedback');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
            Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Feedback"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-8 w-8 fill-current cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => setRating(star)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.222 2.65 9.541 2.5 9.88 2.5c.339 0 .659.15.831.427l1.57 2.529 2.904.448c.349.054.655.236.86.5.204.265.29.601.238.936l-.418 2.934 2.104 1.94c.267.247.42.594.42.957 0 .362-.153.709-.42.957l-2.104 1.94.418 2.934c.052.335-.034.671-.238.936-.205.264-.51.446-.86.5l-2.904.448-1.57 2.529c-.172.277-.492.427-.831.427-.339 0-.659-.15-.831-.427l-1.57-2.529-2.904-.448c-.349-.054-.655-.236-.86-.5-.204-.265-.29-.601-.238-.936l.418-2.934L.42 13.384C.153 13.137 0 12.79 0 12.428c0-.362.153-.709.42-.957l2.104-1.94-.418-2.934c-.052-.335.034-.671.238-.936.205-.264.51-.446.86-.5l2.904-.448 1.57-2.529c.172-.277.492-.427.831-.427z"/>
              </svg>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
