export default function ({ store, redirect }) {
  if (!store.getters.subscribe) {
    return redirect('/subscribe')
  }
}