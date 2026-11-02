import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router'

export function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!orderId || !/^\d+$/.test(orderId)) {
      setError('Invalid order reference.')
      setLoading(false)
      return
    }

    let attempts = 0
    let intervalId

    async function checkOrder() {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          credentials: 'include',
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Could not retrieve your order.')
        }

        setOrder(data)
        setLoading(false)

        // Clear the saved order once the payment has a final status.
        if (data.status === 'paid' || data.status === 'failed') {
          sessionStorage.removeItem('pendingPaymentOrderId')
          clearInterval(intervalId)
        }
      } catch (err) {
        setError(err.message || 'Could not retrieve your order.')
        setLoading(false)
        clearInterval(intervalId)
      }
    }

    checkOrder()

    // Give the Paystack webhook time to update the order.
    intervalId = setInterval(() => {
      attempts += 1

      if (attempts >= 10) {
        clearInterval(intervalId)
        return
      }

      checkOrder()
    }, 3000)

    return () => clearInterval(intervalId)
  }, [orderId])

  return (
    <main className="min-h-screen bg-[#101010] px-4 py-16 text-white">
      <div className="mx-auto max-w-xl rounded-xl border border-[#333333] bg-[#1c1c1c] p-8 text-center">
        <h1 className="mb-6 text-3xl font-bold">
          Payment status
        </h1>

        {loading && (
          <p className="text-[#b0b0b0]">
            Checking your payment...
          </p>
        )}

        {!loading && error && (
          <>
            <p className="mb-4 text-red-400">{error}</p>
            <p className="text-sm text-[#b0b0b0]">
              Please sign in with the account used to place the order.
            </p>
          </>
        )}

        {!loading && !error && order?.status === 'paid' && (
          <>
            <p className="mb-3 text-2xl font-semibold text-[#c8ff00]">
              Payment confirmed
            </p>
            <p className="text-[#b0b0b0]">
              Your membership payment was successful.
            </p>
          </>
        )}

        {!loading && !error && order?.status === 'pending' && (
          <>
            <p className="mb-3 text-xl font-semibold">
              Payment is being confirmed
            </p>
            <p className="text-[#b0b0b0]">
              We have received your return from Paystack, but the payment
              confirmation is still pending. Please check again shortly.
            </p>
          </>
        )}

        {!loading && !error && order?.status === 'failed' && (
          <>
            <p className="mb-3 text-xl font-semibold text-red-400">
              Payment unsuccessful
            </p>
            <p className="text-[#b0b0b0]">
              Your payment could not be completed. Please try again.
            </p>
          </>
        )}

        {!loading && !error && order && !['paid', 'pending', 'failed'].includes(order.status) && (
          <p className="text-[#b0b0b0]">
            Current order status: {order.status}
          </p>
        )}

        {order && (
          <p className="mt-6 text-sm text-[#b0b0b0]">
            Order number: {order.id}
          </p>
        )}

        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-[#c8ff00] px-6 py-3 font-semibold text-black transition hover:bg-[#d8ff4d]"
        >
          Return to FitZone
        </Link>
      </div>
    </main>
  )
}
