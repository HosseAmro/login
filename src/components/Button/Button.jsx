export default function Button(p) {
  return (
    <button
              className={`focus:bg-dark focus:text-blue0 hover:bg-dark hover:text-blue0  mt-8 bg-white w-30 p-4 text-dark rounded-larger font-medium text-center text-4xl`}
            >
              {p.nameButton}
            </button>
  )
}
