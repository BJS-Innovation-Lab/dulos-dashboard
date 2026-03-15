"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {
  eventName: string;
  zoneName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  tickets: Array<{ phone: string; name: string; lastName: string; email: string }>;
}

function CheckoutForm({ total, onSuccess }: { total: number; onSuccess: (orderId: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Error al procesar");
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmacion`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message || "Error al procesar el pago");
      setLoading(false);
    } else if (result.paymentIntent?.status === "succeeded") {
      onSuccess(result.paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1rem" }}>
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>
      {error && (
        <p style={{ color: "#E63946", fontSize: "0.8rem", marginBottom: "0.75rem", textAlign: "center" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: "100%", padding: "1.1rem",
          background: loading ? "rgba(99,91,255,0.5)" : "linear-gradient(135deg, #635BFF, #7A73FF)",
          color: "#fff", border: "none", borderRadius: "8px",
          fontSize: "1rem", fontWeight: 800,
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          boxShadow: loading ? "none" : "0 4px 30px rgba(99,91,255,0.4)",
          transition: "all 0.3s",
        }}
      >
        {loading ? "Procesando..." : `Pagar $${total.toLocaleString()}.00 MXN`}
      </button>
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem", textAlign: "center", marginTop: "0.5rem" }}>
        🔒 Pago seguro con encriptación SSL · Sin comisiones
      </p>
    </form>
  );
}

export default function StripeCheckout({ eventName, zoneName, quantity, unitPrice, total, tickets }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventName, zoneName, quantity, unitPrice, total, tickets }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        marginTop: "1rem", borderRadius: "0.75rem", overflow: "hidden",
        border: "1px solid rgba(76,175,80,0.4)",
        background: "rgba(76,175,80,0.1)",
        padding: "2rem", textAlign: "center",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>✓</div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#4CAF50", marginBottom: "0.5rem" }}>
          ¡Pago exitoso!
        </h3>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
          Tus boletos llegarán por correo electrónico
        </p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div style={{ marginTop: "1rem" }}>
        {error && (
          <p style={{ color: "#E63946", fontSize: "0.8rem", marginBottom: "0.75rem", textAlign: "center" }}>{error}</p>
        )}
        <button
          onClick={initPayment}
          disabled={loading}
          style={{
            width: "100%", padding: "1.1rem",
            background: loading ? "rgba(99,91,255,0.5)" : "linear-gradient(135deg, #635BFF, #7A73FF)",
            color: "#fff", border: "none", borderRadius: "8px",
            fontSize: "1rem", fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            boxShadow: loading ? "none" : "0 4px 30px rgba(99,91,255,0.4)",
          }}
        >
          {loading ? "Preparando pago..." : `Pagar $${total.toLocaleString()}.00 MXN`}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      marginTop: "1rem", borderRadius: "0.75rem", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "#111",
    }}>
      <div style={{
        padding: "0.75rem 1rem",
        background: "linear-gradient(135deg, #635BFF, #7A73FF)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.15)"/>
            <path d="M13.976 9.15c-2.17-.5-3.057-.87-3.057-1.82 0-.78.69-1.24 1.856-1.24 1.826 0 3.057.72 3.057.72l.58-2.45s-1.24-.82-3.547-.82c-2.62 0-4.41 1.44-4.41 3.51 0 2.33 2.18 3.1 3.99 3.55 1.49.37 2.04.78 2.04 1.44 0 .78-.78 1.28-2.06 1.28-1.93 0-3.54-.92-3.54-.92l-.6 2.5s1.56.92 4.06.92c2.7 0 4.63-1.34 4.63-3.6 0-2.53-2.18-3.26-3.99-3.73z" fill="#fff"/>
          </svg>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>Pago con tarjeta</span>
        </div>
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)" }}>Powered by Stripe</span>
      </div>
      <div style={{ padding: "1rem" }}>
        <Elements stripe={stripePromise} options={{
          clientSecret,
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#635BFF",
              colorBackground: "#1a1a1a",
              colorText: "#fff",
              colorDanger: "#E63946",
              fontFamily: "inherit",
              borderRadius: "8px",
            },
          },
        }}>
          <CheckoutForm total={total} onSuccess={(pid) => setSuccess(true)} />
        </Elements>
      </div>
    </div>
  );
}
