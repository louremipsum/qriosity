import AccountBlocked from "@/components/emails/AccountBlocked";
import { render } from "@react-email/render";

const Email = () => {
  // const html = render(<AccountBlocked />, {
  //   pretty: true,
  // });
  // console.log("html");
  // console.log(html);
  return (
    <AccountBlocked />
    // <div>Hello</div>
  );
};

export default Email;
