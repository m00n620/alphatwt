export default function AsciiHeader() {
  return (
    <>
      <pre
        className="m-0 text-center hidden md:block md:text-sm lg:text-lg"
        style={{ lineHeight: 0.5 }}
      >
        {`
 .d8b.  db      d8888b. db   db  .d8b.  d888888b db   d8b   db d88888b d88888b d888888b\n
d8' \`8b 88      88  \`8D 88   88 d8' \`8b \`~~88~~' 88   I8I   88 88'     88'     \`~~88~~'\n
88ooo88 88      88oodD' 88ooo88 88ooo88    88    88   I8I   88 88ooooo 88ooooo    88   \n
88~~~88 88      88~~~   88~~~88 88~~~88    88    Y8   I8I   88 88~~~~~ 88~~~~~    88   \n
88   88 88booo. 88      88   88 88   88    88    \`8b d8'8b d8' 88.     88.        88   \n
YP   YP Y88888P 88      YP   YP YP   YP    YP     \`8b8' \`8d8'  Y88888P Y88888P    YP\`  \n
      `}
      </pre>
      <pre className="m-0 md:hidden text-tiny sm:text-base text-center" style={{ lineHeight: 0.8 }}>
        {`
 .d8b.  db      d8888b. db   db  .d8b. 
d8' \`8b 88      88  \`8D 88   88 d8' \`8b
88ooo88 88      88oodD' 88ooo88 88ooo88
88~~~88 88      88~~~   88~~~88 88~~~88
88   88 88booo. 88      88   88 88   88
YP   YP Y88888P 88      YP   YP YP   YP

d888888b db   d8b   db d88888b d88888b d888888b
\`~~88~~\' 88   I8I   88 88'     88'     \`~~88~~'
   88    88   I8I   88 88ooooo 88ooooo    88   
   88    Y8   I8I   88 88~~~~~ 88~~~~~    88   
   88    \`8b d8'8b d8' 88.     88.        88   
   YP     \`8b8' \`8d8'  Y88888P Y88888P    YP   
        `}
      </pre>
    </>
  );
}
