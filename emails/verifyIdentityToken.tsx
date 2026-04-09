import { Body, Container, Head, Html, Img, Preview, Section, Button, Text, Column, Row, Tailwind, type TailwindConfig, pixelBasedPreset, Heading, Hr } from "@react-email/components";

export default function VerifyIdentityToken() {
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
          <Container className="bg-card text-card-foreground rounded-lg">
            <Section className="bg-primary text-primary-foreground px-8 py-5 rounded-t-lg">
              <Button href="https://kodal.pet">
                <Row>
                  <Column>
                    <Img
                      src="https://ci3.googleusercontent.com/meips/ADKq_NYfIPsNH_aP0jB-ew8yD8zzZftxtBGdMOXinniRoaGUPM8j3t_qB3A9qBOaDhhfhJDdJ3DNwNVryJPP7xOsMk3aDL0vGfyHuvflRnCseAmtgg=s0-d-e1-ft#https://resend-attachments.s3.amazonaws.com/P82cphu31qrXOl0"
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
                href=""
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
                <Button className="text-primary text-xs font-medium">Política de Privacidad</Button>
                <span className="text-primary px-2">·</span>
                <Button className="text-primary text-xs font-medium">Términos de Servicio</Button>
                <span className="text-primary px-2">·</span>
                <Button className="text-primary text-xs font-medium">Soporte</Button>
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

const styles = {
  body: {
    backgroundColor: "#e9e7e2",
    fontFamily:
      "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    margin: "0",
    padding: "24px 12px",
    color: "#5f6368",
  },
  container: {
    maxWidth: "760px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "#e9e7e2",
    border: "1px solid #3d3d3d",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
  },
  header: {
    backgroundColor: "#ef6408",
    padding: "28px 38px",
  },
  logo: {
    display: "block",
    width: "220px",
    maxWidth: "100%",
    height: "auto",
  },
  content: {
    padding: "48px 40px 30px",
    textAlign: "center" as const,
  },
  title: {
    margin: "0 0 18px",
    fontSize: "44px",
    lineHeight: "1.1",
    letterSpacing: "-0.5px",
    color: "#57595d",
    fontWeight: "800",
  },
  paragraph: {
    margin: "0 auto 26px",
    maxWidth: "560px",
    fontSize: "34px",
    lineHeight: "1.25",
    color: "#6b7075",
    fontWeight: "500",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#ef6408",
    color: "#ffffff",
    fontSize: "38px",
    lineHeight: "1",
    fontWeight: "700",
    textDecoration: "none",
    padding: "26px 44px",
    borderRadius: "16px",
    margin: "8px 0 20px",
  },
  expiration: {
    margin: "6px 0 30px",
    fontSize: "31px",
    lineHeight: "1.35",
    color: "#6a6f74",
    fontWeight: "500",
  },
  alertBox: {
    border: "2px solid #4c4c4c",
    backgroundColor: "#f0ede7",
    borderRadius: "2px",
    padding: "24px 28px",
    textAlign: "left" as const,
    margin: "0 auto",
  },
  alertText: {
    margin: "0",
    fontSize: "35px",
    lineHeight: "1.4",
    color: "#6b6f73",
    fontWeight: "500",
  },
  footer: {
    padding: "20px 40px 42px",
    textAlign: "center" as const,
  },
  footerText: {
    margin: "28px 0 16px",
    fontSize: "31px",
    lineHeight: "1.4",
    color: "#6a6f74",
    fontWeight: "500",
  },
  footerLinks: {
    margin: "0 0 12px",
    fontSize: "31px",
    lineHeight: "1.4",
    fontWeight: "500",
  },
  link: {
    color: "#ef6408",
    textDecoration: "none",
  },
  dot: {
    color: "#9a9a9a",
  },
  copyright: {
    margin: "0",
    fontSize: "30px",
    lineHeight: "1.4",
    color: "#6a6f74",
    fontWeight: "500",
  },
};
