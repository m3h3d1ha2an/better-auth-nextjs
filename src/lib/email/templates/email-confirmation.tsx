import { Body, Button, Container, Head, Heading, Html, Preview, Section, Tailwind, Text } from "@react-email/components";

export const EmailConfirmation = (url: string) => (
  <Html dir="ltr" lang="en">
    <Tailwind>
      <Head />
      <Preview>Confirm your email address to create your account</Preview>
      <Body className="bg-white py-10 font-sans">
        <Container className="mx-auto max-w-125 rounded-xl bg-gray-100 p-12 text-center">
          {/* App Name */}
          <Section className="mb-8">
            <Text className="m-0 font-bold text-[20px] text-gray-900">Better Auth NextJS</Text>
          </Section>

          {/* Heading */}
          <Section className="mb-6">
            <Heading className="m-0 font-bold text-[28px] text-gray-900">Confirm your email</Heading>
          </Section>

          {/* Description */}
          <Section className="mb-8">
            <Text className="m-0 text-[16px] text-gray-700 leading-6">
              You're almost there! We just need to confirm your email address to create your account.
            </Text>
          </Section>

          {/* CTA Button */}
          <Section className="mb-8">
            <Button
              className="box-border inline-block rounded-xl bg-black px-8 py-3.5 font-medium text-[16px] text-white no-underline"
              href={url}
            >
              Confirm Email
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

        {/* Copyright outside card */}
        <Section className="mt-8 text-center">
          <Text className="m-0 text-[14px] text-gray-500">© {new Date().getFullYear()} Better Auth NextJS</Text>
        </Section>
      </Body>
    </Tailwind>
  </Html>
);

EmailConfirmation.PreviewProps = {
  url: "https://example.com/confirm-email",
};
