import { Body, Button, Container, Head, Heading, Html, Preview, Section, Tailwind, Text } from "@react-email/components";

const VerifyEmailTemplate = (url: string) => (
  <Html dir="ltr" lang="en">
    <Tailwind>
      <Head />
      <Preview>Verify your email address to activate your account</Preview>
      <Body className="bg-white py-10 font-sans">
        <Container className="mx-auto max-w-125 rounded-xl bg-gray-100 p-12 text-center">
          {/* App Name */}
          <Section className="mb-8">
            <Text className="m-0 font-bold text-[20px] text-gray-900">Better Auth NextJS</Text>
          </Section>

          {/* Heading */}
          <Section className="mb-6">
            <Heading className="m-0 font-bold text-[28px] text-gray-900">Verify your email address</Heading>
          </Section>

          {/* Description */}
          <Section className="mb-8">
            <Text className="m-0 text-[16px] text-gray-700 leading-6">
              You're almost there! Click the button below to verify your email address and activate your account.
            </Text>
          </Section>

          {/* CTA Button */}
          <Section className="mb-8">
            <Button
              className="box-border inline-block rounded-xl bg-black px-8 py-3.5 font-medium text-[16px] text-white no-underline"
              href={url}
            >
              Verify Email
            </Button>
          </Section>

          {/* Sign-off */}
          <Section>
            <Text className="m-0 text-[16px] text-gray-700 leading-6">
              See you there,
              <br />
              The BetterAuth NextJS Team.
            </Text>
          </Section>
        </Container>

        {/* Copyright */}
        <Section className="mt-8 text-center">
          <Text className="m-0 text-[14px] text-gray-500">© {new Date().getFullYear()} Better Auth NextJS</Text>
        </Section>
      </Body>
    </Tailwind>
  </Html>
);

VerifyEmailTemplate.PreviewProps = {
  url: "https://example.com/verify-email",
};

export default VerifyEmailTemplate;
