// Frontend-only Razorpay helper
// Usage: import { openRazorpayCheckout } from '../utilits/razorpayClient';

type RazorpayOptions = {
  amount: number; // in rupees (will convert to paise)
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  order_id?: string | null;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
};

const loadScript = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load script: " + src));
    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = async (opts: RazorpayOptions) => {
  const key = process.env.REACT_APP_RAZORPAY_KEY_ID;
  if (!key) throw new Error("REACT_APP_RAZORPAY_KEY_ID is not set in env.");

  await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  return new Promise<any>((resolve, reject) => {
    try {
      const options: any = {
        key,
        amount: Math.round(opts.amount * 100), // paise
        currency: opts.currency || "INR",
        name: opts.name || "PK-Soft Store",
        description: opts.description || "Order Payment",
        image: opts.image || undefined,
        order_id: opts.order_id || undefined, // if you have server-created order
        handler: function (response: any) {
          // response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature
          resolve(response);
        },
        modal: {
          ondismiss: function () {
            reject(new Error("Payment popup closed by user."));
          },
        },
        prefill: opts.prefill || {},
        notes: opts.notes || {},
        theme: { color: "#ff3f6c" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      reject(err);
    }
  });
};

export default { openRazorpayCheckout };