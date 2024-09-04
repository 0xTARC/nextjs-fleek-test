import { ToastContainer, Bounce } from 'react-toastify'

export const Notification = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        limit={1}
      />
    </>
  )
}