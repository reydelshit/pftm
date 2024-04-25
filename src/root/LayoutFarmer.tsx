import { Navigate } from 'react-router-dom'

export default function LayoutFarmer({
  children,
}: {
  children: React.ReactNode
}) {
  const pftmToken = localStorage.getItem('pftm_token')
  if (!pftmToken) {
    return <Navigate to="/login" replace={true} />
  }

  if (pftmToken) {
    return <div>{children}</div>
  }
}
