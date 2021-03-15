export default function ({ $auth, $cookies }) {
  const accessToken = $cookies.get('AccessToken')
  const refreshToken = $cookies.get('AccessToken')

  const data = parseJwt(accessToken)
  if (typeof accessToken !== 'undefined') {
    if ($auth.strategy.token.get() !== accessToken) {
      $auth.setUserToken(accessToken, refreshToken)
      $auth.setStrategy('local')
      $auth.setUser(data?.battle_tag)
    }
  }
}
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
