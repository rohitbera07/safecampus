import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import side from "../assets/feed.png"
export default function Bottom() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulated API call
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          Math.random() > 0.3 ? resolve("success") : reject("error");
        }, 2000)
      );

      alert("✅ Feedback submitted successfully!");
    } catch (error) {
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setFormData({ name: "", email: "", message: "" }); // clear form
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-zinc-50 px-6 py-5 flex items-center justify-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image */}
        <div className="flex justify-center">
          <img
            src={side}
            alt="Feedback illustration"
            className="rounded-lg shadow-lg w-[50vw] hidden sm:block h-[90vh] object-cover"
          />
        </div>

        {/* Right Side - Feedback Form */}
        <Card className="w-full h-[90vh] max-w-md shadow-xl border border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-600">
              Share Your Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Feedback"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
