import { Navigate } from 'react-router-dom'

export default function LayoutFarmer({
  children,
}: {
  children: React.ReactNode
}) {
  const cmhsLoginToken = localStorage.getItem('pftm_token')
  const accountType = localStorage.getItem('pftm_account_type')

  if (accountType === 'qa' && cmhsLoginToken) {
    return <Navigate to="/qa" replace={true} />
  }

  if (accountType === 'farmer' && cmhsLoginToken) {
    return <div>{children}</div>
  }

  if (!accountType || !cmhsLoginToken) {
    return <Navigate to="/login" replace={true} />
  }
}
