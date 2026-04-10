import { Body, Container, Head, Html, Img, Preview, Section, Button, Text, Column, Row, Tailwind, type TailwindConfig, pixelBasedPreset, Heading, Hr } from "@react-email/components";

type VerifyIdentityTokenProps = {
  ORIGIN: string;
  EDIT_PATH: string;
}
export default function VerifyIdentityToken({
  ORIGIN = "https://example.com",
  EDIT_PATH = "medal/MEDAL_ID/edit?token=TOKEN",
}: VerifyIdentityTokenProps
) {
  const config:TailwindConfig = {
    theme: {
      extend: {
        colors: {
          "primary": "#E46212",
          "primary-foreground": "#FFFFFF",

          "card": "#FFF8EA",
          "card-foreground": "#595959",

          "muted-foreground": "#737373",
        }
      }
    }
  }
  return (
    <Html>
      <Head />
      <Preview>Verifica tu identidad para editar el perfil de tu mascota</Preview>
      <Tailwind config={config}>
        <Body className="font-sans">
          <Container className="bg-card text-card-foreground rounded-lg max-w-150">
            <Section className="bg-primary text-primary-foreground px-8 py-5 rounded-t-lg">
              <Button href={ORIGIN}>
                <Row>
                  <Column>
                    <Img
                      src="https://aztpfuxscxacuoikmdsg.supabase.co/storage/v1/object/public/email_assets/logo.png"
                      alt="Kodal - Siempre vuelven a casa"
                      width={64}
                      height={64}
                    />
                  </Column>
                  <Column className="text-primary-foreground pl-3">
                    <Text className="m-0 font-extrabold text-lg leading-4.5">Kodal</Text>
                    <Text className="m-0 font-semibold text-sm leading-3.5">Siempre vuelven a casa</Text>
                  </Column>
                </Row>
              </Button>
            </Section>

            <Section className="px-9 py-4 text-center">
              <Heading className="m-0 text-2xl font-bold">Verificación de Identidad</Heading>
              <Text className="m-0 text-muted-foreground">Hemos recibido una solicitud para editar el perfil de tu mascota</Text>

              <Button
                href={`${ORIGIN}/${EDIT_PATH}`}
                className="bg-primary text-primary-foreground font-bold text-sm px-6 py-3 rounded-lg mt-4 mb-2"
              >
                Editar Mascota
              </Button>

              <Text className="m-0 text-xs text-muted-foreground">Este enlace expira en 15 minutos</Text>

              <Section className="bg-amber-100/80 border border-amber-200 text-amber-700 rounded-lg p-3 w-10/12 mt-4">
                <Text className="text-sm m-0">
                  <strong>Importante:</strong> Si no solicitaste este cambio, ignora
                  este correo. Tu informacion permanece segura y no se realizaran
                  modificaciones.
                </Text>
              </Section>
            </Section>

            <Hr/>

            <Section className="py-4 px-6 text-center rounded-b-lg">
              <Row className="mb-2">
                <Text className="m-0 text-xs text-muted-foreground">Este es un correo automático de Kodal. Por favor no respondas a este mensaje.</Text>
              </Row>
              <Row className="mb-2">
                <Button href={`${ORIGIN}/policy`} className="text-primary text-xs font-medium">Política de Privacidad</Button>
                <span className="text-primary px-2">·</span>
                <Button href={`${ORIGIN}/terms`} className="text-primary text-xs font-medium">Términos de Servicio</Button>
                <span className="text-primary px-2">·</span>
                <Button href={`${ORIGIN}/support`} className="text-primary text-xs font-medium">Soporte</Button>
              </Row>
              <Row>
                <Text className="text-muted-foreground text-xs m-0">© 2026 Kodal. Todos los derechos reservados.</Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
