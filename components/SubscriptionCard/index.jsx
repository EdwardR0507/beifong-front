import SubscriptionModal from "components/SubscriptionModal"

export default function SubscriptionCard({
  type,
  price,
  features,
  children,
  handleSubmit,
}) {
  const order = {
    price,
    type,
  }
  const isAnual = type === "Anual"

  return (
    <article
      className={`flex flex-col items-center w-4/5 px-8 py-10 mb-8 shadow-lg place-self-center dark:shadow-white/20 rounded-lg ${
        isAnual
          ? "text-white bg-gray-700 dark:bg-gray-600"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <header className="flex justify-between w-full">
        <h2
          className={`text-xl font-semibold text-center first-letter:uppercase ${
            isAnual && "text-amber-400"
          }`}
        >
          {type}
        </h2>
        {isAnual && (
          <h2 className="px-4 py-1 text-lg font-semibold text-center text-white rounded-lg shadow-lg bg-emerald-500 shadow-emerald-400/40">
            Popular
          </h2>
        )}
      </header>
      <section className="flex flex-col mt-4">
        <h3 className="text-4xl font-semibold ">{price}</h3>
        <div className="flex flex-col mb-4 text-left">{children}</div>
        <hr className="block w-full my-8 opacity-30" />
        {features.map((feature, index) => (
          <p key={index} className="flex items-center justify-center">
            <span className="material-icons text-emerald-400">done</span>
            <span className="ml-2">{feature}</span>
          </p>
        ))}
        <SubscriptionModal order={order} onSubmitSubscription={handleSubmit} />
      </section>
    </article>
  )
}
