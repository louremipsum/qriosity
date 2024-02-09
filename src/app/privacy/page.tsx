"use client";
import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";

import cx from "clsx";
import {
  Text,
  Group,
  rem,
  Stack,
  Title,
  Grid,
  ScrollArea,
  List,
} from "@mantine/core";
import { IconListSearch } from "@tabler/icons-react";
import classes from "@styles/TableOfContents.module.css";
import { useState } from "react";
import Link from "next/link";
import { FooterLinks } from "@/components/common/Footer";

const links = [
  { label: "Qriosity Privacy Policy", link: "#title", order: 1 },
  { label: "Introduction", link: "#Introduction", order: 1 },
  {
    label: "Interpretation and Definitions",
    link: "#interpretation-and-definitions",
    order: 1,
  },
  { label: "Interpretation", link: "#interpretation", order: 2 },
  { label: "Definitions", link: "#definitions", order: 2 },
  {
    label: "Collecting and Using Your Personal Data",
    link: "#collecting-and-using-your-personal-data",
    order: 1,
  },
  {
    label: "Types of Data Collected",
    link: "#types-of-data-collected",
    order: 2,
  },
  { label: "Personal Data", link: "#personal-data", order: 3 },
  { label: "Payment", link: "#payment", order: 3 },
  { label: "Usage Data", link: "#usage-data", order: 3 },
  { label: "Cookies and Tracking", link: "#cookies", order: 1 },
  { label: "Auth0", link: "#cookie-auth0", order: 2 },
  { label: "Stripe", link: "#cookie-stripe", order: 2 },
  {
    label: "Use of Your Personal Data",
    link: "#use-of-your-personal-data",
    order: 1,
  },
  {
    label: "Retention of Your Personal Data",
    link: "#retention-of-your-personal-data",
    order: 1,
  },
  {
    label: "Transfer of Your Personal Data",
    link: "#transfer-of-your-personal-data",
    order: 1,
  },
  {
    label: "Disclosure of Your Personal Data",
    link: "#disclosure-of-your-personal-data",
    order: 1,
  },
  {
    label: "Security of Your Personal Data",
    link: "#security-of-your-personal-data",
    order: 1,
  },
  { label: "Children's Privacy", link: "#childrens-privacy", order: 1 },
  { label: "GDPR", link: "#GDPR", order: 1 },
  { label: "CalOPPA", link: "#CalOPPA", order: 1 },
  { label: "CCPA", link: "#CCPA", order: 1 },
  {
    label: "Links to Other Websites",
    link: "#links-to-other-websites",
    order: 1,
  },
  {
    label: "Changes to this Privacy Policy",
    link: "#changes-to-this-privacy-policy",
    order: 1,
  },
  { label: "Contact Us", link: "#contact-us", order: 1 },
];

const TOC = () => {
  const [active, setActive] = useState<string | null>("#title");
  const items = links.map((item) => (
    <Link
      href={item.link}
      onClick={() => {
        setActive(item.link);
      }}
      key={item.label}
      className={cx(classes.link, {
        [classes.linkActive]: active === item.link,
      })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
    >
      {item.label}
    </Link>
  ));

  return (
    <div className={classes.toc}>
      <Group mb="md">
        <IconListSearch
          style={{ width: rem(18), height: rem(18) }}
          stroke={1.5}
        />
        <Text>Table of contents</Text>
      </Group>
      <ScrollArea h={"80vh"}>{items}</ScrollArea>
    </div>
  );
};

const Privacy = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Header opened={opened} toggle={toggle} burger />
      <Grid m={"sm"}>
        <Grid.Col span={{ base: 12, sm: 2, md: 2, lg: 2 }} mt={"md"}>
          <TOC />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }} offset={0.5}>
          <Stack className={classes.content}>
            <Title id="Title" order={1} ta={"center"} fz={"3rem"} m={"lg"}>
              Privacy Policy
            </Title>
            <Text fz={"lg"}>Last updated: February 3, 2024</Text>
            <Text fz={"lg"}>
              Welcome to Qriosity! This privacy policy outlines how we collect,
              use, and safeguard your information when you use our services.
              This privacy policy applies to the use of the Qriosity website and
              services. By accessing and using Qriosity, you agree to the terms
              of this privacy policy.
            </Text>
            <Title id="Introduction" order={2}>
              Introduction
            </Title>
            <Text fz={"lg"}>
              Qriosity offers a service that allows users to create temporary QR
              codes. To provide this service, we collect and process certain
              information. This privacy policy aims to inform you about the
              types of data we collect, how we use it, and your rights regarding
              your information.
            </Text>
            <Title id="interpretation-and-definitions" order={2}>
              Interpretation and Definitions
            </Title>
            <Title id="interpretation" order={3}>
              Interpretation
            </Title>
            <Text fz={"lg"}>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </Text>
            <Title id="definitions" order={3}>
              Definitions
            </Title>
            <Text fz={"lg"}>For the purposes of this Privacy Policy:</Text>
            <List withPadding size="lg">
              <List.Item>
                <b>Account </b> means a unique account created for You to access
                our Service or parts of our Service.
              </List.Item>
              <List.Item>
                <b>Company</b> (referred to as either &quot;the Company&quot;,
                &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this
                Agreement) refers to Qriosity.
              </List.Item>
              <List.Item>
                <b>Cookies </b> are small files that are placed on Your
                computer, mobile device or any other device by a website,
                containing the details of Your browsing history on that website
                among its many uses.
              </List.Item>
              <List.Item>
                <b>Country</b> refers to: India
              </List.Item>
              <List.Item>
                <b>Device</b> means any device that can access the Service such
                as a computer, a cellphone or a digital tablet.
              </List.Item>
              <List.Item>
                <b>Personal Data</b> is any information that relates to an
                identified or identifiable individual.
              </List.Item>
              <List.Item>
                <b>Service</b> refers to the Website.
              </List.Item>
              <List.Item>
                <b>Service Provider</b>means any natural or legal person who
                processes the data on behalf of the Company. It refers to
                third-party companies or individuals employed by the Company to
                facilitate the Service, to provide the Service on behalf of the
                Company, to perform services related to the Service or to assist
                the Company in analyzing how the Service is used.
              </List.Item>
              <List.Item>
                <b>Third-party Social Media Service</b> refers to any website or
                any social network website through which a user can log in or
                create an account to use the Service
              </List.Item>
              <List.Item>
                <b>Usage Data</b> refers to data collected automatically, either
                generated by the use of the Service or from the Service
                infrastructure itself (for example, the duration of a page
                visit).
              </List.Item>
              <List.Item>
                <b>Website</b> refers to Qriosity, accessible from{" "}
                <a
                  href="https://qriosity.vercel.app"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  style={{ color: "#00a495" }}
                >
                  qriosity.vercel.app
                </a>
              </List.Item>
              <List.Item>
                <b>“You”</b> means the individual accessing or using the
                Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </List.Item>
            </List>
            <Title id="collecting-and-using-your-personal-data" order={2}>
              Collecting and Using Your Personal Data
            </Title>
            <Title id="types-of-data-collected" order={3}>
              Types of Data Collected
            </Title>
            <Title id="personal-data" order={4}>
              Personal Data
            </Title>
            <Text fz={"lg"}>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Please note that this information is either publicly
              available or obtained with your consent. Personally, identifiable
              information may include, but is not limited to:
            </Text>
            <List withPadding size="lg">
              <List.Item>First name and last name</List.Item>
              <List.Item>Email address</List.Item>
              <List.Item>Usage Data</List.Item>
              <List.Item>Profile Picture</List.Item>
            </List>

            <Title id="payment" order={4}>
              Payment
            </Title>

            <Text fz={"lg"}>
              We may provide paid products and/or services within Service. In
              that case, we use third-party services for payment processing
              (e.g. payment processors).
            </Text>
            <Text fz={"lg"}>
              We will not store or collect your payment card details. That
              information is provided directly to our third-party payment
              processors whose use of your personal information is governed by
              their Privacy Policy. These payment processors adhere to the
              standards set by PCI-DSS as managed by the PCI Security Standards
              Council, which is a joint effort of brands like Visa, Mastercard,
              American Express and Discover. PCI-DSS requirements help ensure
              the secure handling of payment information.
              <br />
              The payment processors we work with are:
              <br />
              <b>Stripe</b>
            </Text>
            <Text fz={"lg"}>
              Their Privacy Policy can be viewed at{" "}
              <a
                href="https://stripe.com/in/privacy"
                target="_blank"
                referrerPolicy="no-referrer"
                style={{ color: "#00a495" }}
              >
                stripe.com/privacy
              </a>
            </Text>
            <Title id="usage-data" order={4}>
              Usage Data
            </Title>
            <Text fz={"lg"}>
              Usage Data is collected automatically when using the Service.
              Usage Data may include information such as Your Device&apos;s
              Internet Protocol address (e.g. IP address), browser type, browser
              version, the pages of our Service that You visit, the time and
              date of Your visit, the time spent on those pages, unique device
              identifiers and other diagnostic data. When You access the Service
              by or through a mobile device, We may collect certain information
              automatically, including, but not limited to, the type of mobile
              device You use, Your mobile device unique ID, the IP address of
              Your mobile device, Your mobile operating system, the type of
              mobile Internet browser You use, unique device identifiers and
              other diagnostic data. We may also collect information that Your
              browser sends whenever You visit our Service or when You access
              the Service by or through a mobile device.
            </Text>
            <Title id="cookies" order={3}>
              Cookies and Tracking
            </Title>
            <Title id="cookie-auth0" order={4}>
              Auth0
            </Title>
            <Text fz={"lg"}>
              Cookies are used by Auth0 for user authentication and session
              management. We use Auth0 to authenticate and authorize users.
              Auth0 uses cookies to authenticate users and to provide a secure
              login experience. By using Qriosity, you consent to the use of
              cookies for these purposes.
            </Text>
            <Title id="cookie-stripe" order={4}>
              Stripe
            </Title>
            <Text fz={"lg"}>
              Stripe uses third-party cookies for payment processing. Refer to
              Stripe&apos;s{" "}
              <a
                href="https://stripe.com/in/privacy"
                target="_blank"
                referrerPolicy="no-referrer"
                style={{ color: "#00a495" }}
              >
                privacy policy
              </a>{" "}
              for more information. Stripe uses cookies to process payments and
              to provide a secure payment experience. By using Qriosity, you
              consent to the use of cookies for these purposes.
            </Text>
            <Title id="use-of-your-personal-data" order={2}>
              Use of Your Personal Data
            </Title>
            <Text fz={"lg"}>
              The Company may use Personal Data for the following purposes:
            </Text>
            <List
              listStyleType="disc"
              size="lg"
              style={{ "--mantine-space": "10px" }}
            >
              <List.Item>
                To provide and maintain our Service, including to monitor the
                usage of our Service.
              </List.Item>
              <List.Item>
                <b>
                  The Company may use Personal Data for the following purposes:
                </b>{" "}
                To provide and maintain our Service, including to monitor the
                usage of our Service.
              </List.Item>
              <List.Item>
                <b>To manage Your Account:</b> to manage Your registration as a
                user of the Service. The Personal Data You provide can give You
                access to different functionalities of the Service that are
                available to You as a registered user.
              </List.Item>
              <List.Item>
                <b>For the performance of a contract:</b> the development,
                compliance and undertaking of the purchase contract for the
                products, items or services You have purchased or of any other
                contract with Us through the Service.
              </List.Item>
              <List.Item>
                <b>To contact You:</b> To contact You by email, telephone calls,
                SMS, or other equivalent forms of electronic communication, such
                as a mobile application&apos;s push notifications regarding
                updates or informative communications related to the
                functionalities, products or contracted services, including the
                security updates, when necessary or reasonable for their
                implementation. To provide You with news, special offers and
                general information about other goods, services and events which
                we offer that are similar to those that you have already
                purchased or enquired about unless You have opted not to receive
                such information.
              </List.Item>
              <List.Item>
                <b>To manage Your requests:</b> To attend and manage Your
                requests to Us.
              </List.Item>
              <List.Item>
                <b>For business transfers:</b> We may use Your information to
                evaluate or conduct a merger, divestiture, restructuring,
                reorganization, dissolution, or other sale or transfer of some
                or all of Our assets, whether as a going concern or as part of
                bankruptcy, liquidation, or similar proceeding, in which
                Personal Data held by Us about our Service users is among the
                assets transferred.
              </List.Item>
              <List.Item>
                <b>For other purposes:</b> We may use Your information for other
                purposes, such as data analysis, identifying usage trends,
                determining the effectiveness of our promotional campaigns and
                to evaluate and improve our Service, products, services,
                marketing and your experience. We may share Your personal
                information in the following situations:
              </List.Item>
              <List withPadding listStyleType="disc">
                <List.Item>
                  <b>With Service Providers:</b> We may share Your personal
                  information with Service Providers to monitor and analyze the
                  use of our Service, to contact You.
                </List.Item>
                <List.Item>
                  <b>For business transfers:</b> We may share or transfer Your
                  personal information in connection with, or during
                  negotiations of, any merger, sale of Company assets,
                  financing, or acquisition of all or a portion of Our business
                  to another company.
                </List.Item>
                <List.Item>
                  <b>With Affiliates:</b> We may share Your information with Our
                  affiliates, in which case we will require those affiliates to
                  honour this Privacy Policy. Affiliates include Our parent
                  company and any other subsidiaries, joint venture partners or
                  other companies that We control or that are under common
                  control with Us.
                </List.Item>
                <List.Item>
                  <b>With business partners:</b> We may share Your information
                  with Our business partners to offer You certain products,
                  services or promotions.
                </List.Item>
                <List.Item>
                  <b>With other users:</b> when You share personal information
                  or otherwise interact in the public areas with other users,
                  such information may be viewed by all users and may be
                  publicly distributed outside. If You interact with other users
                  or register through a Third-Party Social Media Service, Your
                  contacts on the Third-Party Social Media Service may see Your
                  name, profile, pictures and description of Your activity.
                  Similarly, other users will be able to view descriptions of
                  Your activity, communicate with You and view Your profile.
                </List.Item>
                <List.Item>
                  <b>With Your Consent:</b> We may disclose Your personal
                  information for any other purpose with Your consent.
                </List.Item>
              </List>
            </List>
            <Title id="retention-of-your-personal-data" order={2}>
              Retention of Your Personal Data
            </Title>
            <Text fz={"lg"}>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies. The
              Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </Text>
            <Title id="transfer-of-your-personal-data" order={2}>
              Transfer of Your Personal Data
            </Title>
            <Text size="lg">
              Your information, including Personal Data, is processed at the
              Company&apos;s operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction. Your consent to this
              Privacy Policy followed by Your submission of such information
              represents Your agreement to that transfer. The Company will take
              all steps reasonably necessary to ensure that Your data is treated
              securely and in accordance with this Privacy Policy and no
              transfer of Your Personal Data will take place to an organization
              or a country unless there are adequate controls in place including
              the security of Your data and other personal information.
            </Text>
            <Title id="disclosure-of-your-personal-data" order={2}>
              Disclosure of Your Personal Data
            </Title>
            <Title order={4}>Business Transactions</Title>
            <Text fz={"lg"}>
              If the Company is involved in a merger, acquisition or asset sale,
              Your Personal Data may be transferred. We will provide notice
              before Your Personal Data is transferred and becomes subject to a
              different Privacy Policy.
            </Text>
            <Title order={4}>Law enforcement</Title>
            <Text fz={"lg"}>
              Under certain circumstances, the Company may be required to
              disclose Your Personal Data if required to do so by law or in
              response to valid requests by public authorities (e.g. a court or
              a government agency).
            </Text>
            <Title order={4}>Other legal requirements</Title>
            <Text fz={"lg"}>
              The Company may disclose Your Personal Data in the good faith
              belief that such action is necessary to: Comply with a legal
              obligation Protect and defend the rights or property of the
              Company Prevent or investigate possible wrongdoing in connection
              with the Service Protect the personal safety of users of the
              Service or the public Protect against legal liability
            </Text>
            <Title id="security-of-your-personal-data" order={2}>
              Security of Your Personal Data
            </Title>
            <Text fz={"lg"}>
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </Text>
            <Title id="childrens-privacy" order={2}>
              Children&apos;s Privacy
            </Title>
            <Text fz={"lg"}>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 13. If You are a parent or guardian and You are
              aware that Your child has provided Us with Personal Data, please
              Contact Us. If We become aware that We have collected Personal
              Data from anyone under the age of 13 without verification of
              parental consent, We take steps to remove that information from
              Our servers. If We need to rely on consent as a legal basis for
              processing Your information and Your country requires consent from
              a parent, We may require Your parent&apos;s consent before We
              collect and use that information.
            </Text>
            <Title id="GDPR" order={2}>
              Your Data Protection Rights Under General Data Protection
              Regulation (GDPR)
            </Title>
            <Text fz={"lg"}>
              If You are a resident of the European Economic Area (EEA), You
              have certain data protection rights. The Company aims to take
              reasonable steps to allow You to correct, amend, delete, or limit
              the use of Your Personal Data. If You wish to be informed about
              what Personal Data We hold about You and if You want it to be
              removed from Our systems, please contact Us. In certain
              circumstances, You have the following data protection rights:
            </Text>
            <List withPadding size="lg" type="ordered">
              <List.Item>
                <b>
                  The right to access, update or delete the information we have
                  about you.
                </b>{" "}
                Whenever made possible, you can access, update or request
                deletion of your Personal Data directly within your account
                settings section. If you are unable to perform these actions
                yourself, please contact us to assist you.
              </List.Item>
              <List.Item>
                <b>The right of rectification.</b> You have the right to have
                your information rectified if that information is inaccurate or
                incomplete.
              </List.Item>
              <List.Item>
                <b>The right to object.</b> You have the right to object to our
                processing of your Personal Data.
              </List.Item>
              <List.Item>
                <b>The right of restriction.</b> You have the right to request
                that we restrict the processing of your personal information.
              </List.Item>
              <List.Item>
                <b>The right to data portability.</b> You have the right to be
                provided with a copy of the information we have on you in a
                structured, machine-readable and commonly used format.
              </List.Item>
              <List.Item>
                <b>The right to withdraw consent.</b> You also have the right to
                withdraw your consent at any time where the Company relied on
                your consent to process your personal information.
              </List.Item>
            </List>
            <Text fz={"lg"}>
              Please note that we may ask you to verify your identity before
              responding to such requests. Please note, we may not able to
              provide Service without some necessary data. <br /> You have the
              right to complain to a Data Protection Authority about our
              collection and use of your Personal Data. For more information,
              please contact your local data protection authority in the
              European Economic Area (EEA).
            </Text>
            <Title id="CalOPPA" order={2}>
              Your Data Protection Rights under the California Privacy
              Protection Act (CalOPPA)(California&apos;s Shine the Light law)
            </Title>
            <Text fz={"lg"}>
              CalOPPA is the first state law in the nation to require commercial
              websites and online services to post a privacy policy. The
              law&apos;s reach stretches well beyond California to require a
              person or company in the United States (and conceivable the world)
              that operates websites collecting personally identifiable
              information from California consumers to post a conspicuous
              privacy policy on its website stating exactly the information
              being collected and those individuals with whom it is being
              shared, and to comply with this policy. - See more at:
              <a
                href="https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/"
                target="_blank"
                referrerPolicy="no-referrer"
                style={{ color: "#00a495" }}
              >
                California Online Privacy Protection Act (CalOPPA)
              </a>{" "}
            </Text>
            <Text fz={"lg"}>
              According to CalOPPA, We agree to the following:
            </Text>
            <List withPadding size="lg" type="ordered">
              <List.Item>Users can visit our site anonymously.</List.Item>
              <List.Item>
                Our Privacy Policy link includes the word &quot;Privacy&quot;,
                and can easily be found on the page specified above.
              </List.Item>
              <List.Item>
                You will be notified of any Privacy Policy changes on our
                Privacy Policy Page.
              </List.Item>
              <List.Item>
                You can change your personal information by emailing us.
              </List.Item>
            </List>
            <Title id="CCPA" order={2}>
              Your Data Protection Rights under the California Consumer Privacy
              Act (CCPA)
            </Title>
            <Text fz={"lg"}>
              If You are a California resident, You have the right to know what
              personal information we collect, the purposes for which we use it,
              and Your options to opt out of its sale. To exercise Your data
              protection rights, You can make certain requests and ask us:
            </Text>
            <List withPadding size="lg" type="ordered">
              <List.Item>
                <b>
                  The right to know about the personal information we collect
                  about You
                </b>
                . You have the right to request that We disclose certain
                information to You about Our collection and use of Your personal
                information over the past 12 months. Once We receive and confirm
                Your verifiable consumer request, We will disclose to You:
              </List.Item>
              <List withPadding listStyleType="disc" type="ordered">
                <List.Item>
                  The categories of personal information We collected about You.
                </List.Item>
                <List.Item>
                  The categories of sources for the personal information We
                  collected about You.
                </List.Item>
                <List.Item>
                  Our business or commercial purpose for collecting or selling
                  that personal information.
                </List.Item>
                <List.Item>
                  The categories of third parties with whom We share that
                  personal information.
                </List.Item>
                <List.Item>
                  The specific pieces of personal information We collected about
                  You.
                </List.Item>
                <List.Item>
                  If We sold or disclosed Your personal information for a
                  business purpose, two separate lists disclosing: sales,
                  identifying the personal information categories that each
                  category of recipient purchased; and disclosures for a
                  business purpose, identifying the personal information
                  categories that each category of recipient obtained.
                </List.Item>
              </List>
              <List.Item>
                <b>The right to request deletion of personal information.</b>{" "}
                You have the right to request that We delete any of Your
                personal information that We collected from You and retained,
                subject to certain exceptions. Once We receive and confirm Your
                verifiable consumer request, We will delete (and direct Our
                service providers to delete) Your personal information from Our
                records, unless an exception applies.
              </List.Item>
              <List.Item>
                <b>To stop selling your personal information</b> We don&apos;t
                sell or rent your personal information to any third parties for
                any purpose. You are the only owner of your Personal Data and
                can request disclosure or deletion at any time. Please note, if
                you ask us to delete or stop selling your data, it may impact
                your experience with us, and you may not be able to participate
                in certain programs or membership services which require the
                usage of your personal information to function. But in no
                circumstances, we will discriminate against you for exercising
                your rights. To exercise your California data protection rights
                described above, please send your request(s) by email.
                <br />
                Your data protection rights, described above, are covered by the
                CCPA, short for the California Consumer Privacy Act. To find out
                more, visit the official California Legislative Information
                website. The CCPA took effect on 01/01/2020.
              </List.Item>
              <List.Item>
                <b>The right to non-discrimination.</b> We will not discriminate
                against You for exercising any of Your CCPA rights. Unless
                permitted by the CCPA, We will not:
              </List.Item>
              <List withPadding listStyleType="disc">
                <List.Item>Deny You goods or services.</List.Item>
                <List.Item>
                  Charge You different prices or rates for goods or services,
                  including through granting discounts or other benefits, or
                  imposing penalties.
                </List.Item>
                <List.Item>
                  Provide You a different level or quality of goods or services.
                </List.Item>
                <List.Item>
                  Suggest that You may receive a different price or rate for
                  goods or services or a different level or quality of goods or
                  services.
                </List.Item>
              </List>
            </List>
            <Text fz={"lg"}>
              Please note that We may ask You to verify Your identity before
              responding to such requests. You can exercise Your rights by
              submitting a verifiable consumer request to Us. Only You, or
              someone legally authorized to act on Your behalf, may make a
              verifiable consumer request related to Your personal information.
              You may also make a verifiable consumer request on behalf of Your
              minor child. You may only make a verifiable consumer request for
              access or data portability twice within a 12-month period. The
              verifiable consumer request must:
            </Text>
            <List withPadding size="lg">
              <List.Item>
                Provide sufficient information that allows Us to reasonably
                verify You are the person about whom We collected personal
                information or an authorized representative.
              </List.Item>
              <List.Item>
                Describe Your request with sufficient detail that allows Us to
                properly understand, evaluate, and respond to it.
              </List.Item>
            </List>
            <Text fz={"lg"}>
              We cannot respond to Your request or provide You with personal
              information if We cannot verify Your identity or authority to make
              the request and confirm the personal information relates to You.
              Making a verifiable consumer request does not require You to
              create an account with Us. We will only use personal information
              provided in a verifiable consumer request to verify the
              requestor&apos;s identity or authority to make the request. For
              instructions on exercising sale opt-out rights, see
              &quot;Exercising the Right to Opt-Out&quot;.
            </Text>
            <Title id="links-to-other-websites" order={2}>
              Links to Other Websites
            </Title>
            <Text fz={"lg"}>
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third-party link, You will be
              directed to that third party&apos;s site. We strongly advise You
              to review the Privacy Policy of every site You visit. We have no
              control over and assume no responsibility for the content, privacy
              policies or practices of any third-party sites or services.
            </Text>
            <Title id="changes-to-this-privacy-policy" order={2}>
              Changes to this Privacy Policy
            </Title>
            <Text fz={"lg"}>
              This privacy policy may be updated from time to time. Please check
              this page periodically for any changes. Your continued use of
              Qriosity after such changes constitutes your acceptance of the
              updated policy.
            </Text>
            <Title id="contact-us" order={2}>
              Contact Us
            </Title>
            <Text fz={"lg"}>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
      <FooterLinks />
    </>
  );
};

export default Privacy;
