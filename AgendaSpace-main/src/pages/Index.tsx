import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, Shield, Zap, Star, CheckCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-light via-background to-background">
      {/* Background Mesh Grid & Glow (Efeito 4) */}
      <div className="pointer-events-none fixed inset-0 bg-grid-dots opacity-80 z-0" />
      <div className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-primary/15 blur-[130px] rounded-full z-0" />
      <div className="pointer-events-none fixed bottom-40 right-10 w-[450px] h-[350px] bg-primary/10 blur-[120px] rounded-full z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">AgendaSpace</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="hover:-translate-y-0.5">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button className="btn-shimmer shadow-sm hover:shadow">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
            Gestão Inteligente de<br />
            <span className="text-primary">Espaços Compartilhados</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-2">
            Reserve, gerencie e otimize o uso de espaços de trabalho com nossa plataforma completa e intuitiva
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto btn-shimmer px-8 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30">
                <Calendar className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 hover:-translate-y-0.5">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-medium">4.9/5</span>
              <span className="text-muted-foreground">avaliação média</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-medium">500+</span>
              <span className="text-muted-foreground">reservas realizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-medium">50+</span>
              <span className="text-muted-foreground">espaços cadastrados</span>
            </div>
          </div>
        </div>

        {/* Features with Spotlight Effect (Efeito 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="spotlight-card text-center border-border/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
            <CardHeader>
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <CardTitle>Gestão de Espaços</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Cadastre e gerencie todos os seus espaços com informações detalhadas, recursos disponíveis e preços flexíveis
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="spotlight-card text-center border-border/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
            <CardHeader>
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <CardTitle>Reservas em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sistema de reservas inteligente com verificação de disponibilidade automática e prevenção de conflitos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="spotlight-card text-center border-border/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <CardTitle>Controle de Acesso</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sistema robusto de autenticação com diferentes níveis de acesso e segurança avançada para administradores
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Por que escolher o AgendaSpace?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uma solução completa e intuitiva para otimizar o uso de espaços compartilhados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Rápido e Eficiente</h4>
                <p className="text-muted-foreground">
                  Interface intuitiva que permite fazer reservas em segundos, com confirmação automática.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Agenda Inteligente</h4>
                <p className="text-muted-foreground">
                  Visualize disponibilidade em tempo real e evite conflitos com nossa agenda inteligente.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Seguro e Confiável</h4>
                <p className="text-muted-foreground">
                  Seus dados estão protegidos com criptografia de ponto a ponto e backup automático.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Gestão Completa</h4>
                <p className="text-muted-foreground">
                  Relatórios detalhados, métricas de ocupação e controle total sobre seus espaços.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-1.5 flex-wrap">
            <span>© 2024 AgendaSpace. Desenvolvido com</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-current inline-block" />
            <span>para otimizar seu espaço de trabalho.</span>
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;
