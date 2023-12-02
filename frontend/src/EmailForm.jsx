import { useState } from "react";
import { toast } from "sonner";

const EmailForm = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const submitData = new FormData(event.target);
    const entries = Object.fromEntries(submitData.entries());

    const formdata = new FormData();
    formdata.append("file", entries.file);
    formdata.append("email", entries.email);
    formdata.append("text", entries.message);

    try {
      const response = await fetch(
        "https://mailer-backend.vercel.app/send-mail",
        {
          method: "POST",
          body: formdata,
        }
      );

      const result = await response.json();
      if (result.success) {
        toast.success("Mail sent successfully!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send mail!");
      console.log(error);
    }
  };

  return (
    <>
      <form className="max-w-[500px] w-full mx-auto px-8" onSubmit={onSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
            placeholder="name@gmail.com"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            File
          </label>
          <input
            className="file block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
            id="file"
            name="file"
            type="file"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Leave a message..."
            defaultValue={""}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Mail"}
        </button>
      </form>
    </>
  );
};

export default EmailForm;
