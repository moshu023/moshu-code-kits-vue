
export function auth() {
  const sys = localStorage.getItem('sys')
  const isLogin = sys.isLogin
  if (isLogin === false) {
    this.$message.error('')
  }
}
