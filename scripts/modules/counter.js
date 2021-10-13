export default function counter() {
  // closure counter function
  // lexical environments:
  // 1. counter { counts: 0, anonymous: fn }
  // 2. anonymous {}
  let counts = 0;

  return () => counts += 1;
}