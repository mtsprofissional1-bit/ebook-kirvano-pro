'use client'

import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Clock, 
  Download,
  Rocket,
  Award,
  BookOpen,
  Video,
  FileText,
  Globe,
  TrendingUp,
  Target,
  Brain,
  BarChart3,
  ExternalLink,
  Bookmark,
  Zap,
  DollarSign
} from 'lucide-react'

// Interfaces ------------------------------------------------------------------

interface UserProgress {
  currentChapter: number
  completedQuizzes: number[]
  completedChecklists: number[]
  bookmarks: number[]
  readingTime: number
  certificates: string[]
  studyStreak: number
  lastStudyDate: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface ChecklistItem {
  id: number
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

interface CaseStudy {
  title: string
  industry: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    color: string
  }[]
  keyTakeaways: string[]
}

const chapters = [
  {
    id: 1,
    title: "Fundamentos do Marketing Digital",
    level: "Iniciante",
    estimatedTime: "15 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Introdução ao Marketing Digital</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">O marketing digital revolucionou a forma como as empresas se conectam com seus clientes. Diferente do marketing tradicional, ele oferece precisão, mensuração e personalização em escala global.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Principais Canais Digitais:</h3>
      <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>SEO (Search Engine Optimization):</strong> Otimização para mecanismos de busca</li>
        <li><strong>SEM (Search Engine Marketing):</strong> Marketing em mecanismos de busca</li>
        <li><strong>Redes Sociais:</strong> Facebook, Instagram, LinkedIn, TikTok</li>
        <li><strong>Email Marketing:</strong> Comunicação direta e personalizada</li>
        <li><strong>Marketing de Conteúdo:</strong> Educação e engajamento</li>
      </ul>
      
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
        <h4 class="font-semibold text-indigo-800 mb-2">💡 Dica Importante:</h4>
        <p class="text-indigo-700">O sucesso no marketing digital está na integração de múltiplos canais, criando uma experiência consistente para o cliente em toda sua jornada.</p>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Métricas Fundamentais:</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <h5 class="font-semibold text-gray-800 mb-2">Alcance e Impressões</h5>
          <p class="text-sm text-gray-600">Quantas pessoas viram seu conteúdo</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <h5 class="font-semibold text-gray-800 mb-2">Engajamento</h5>
          <p class="text-sm text-gray-600">Interações com seu conteúdo</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <h5 class="font-semibold text-gray-800 mb-2">Conversão</h5>
          <p class="text-sm text-gray-600">Ações desejadas realizadas</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <h5 class="font-semibold text-gray-800 mb-2">ROI</h5>
          <p class="text-sm text-gray-600">Retorno sobre investimento</p>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual é a principal vantagem do marketing digital sobre o tradicional?",
          options: ["Menor custo", "Maior alcance", "Mensuração precisa", "Todas as anteriores"],
          correct: 3,
          explanation: "O marketing digital oferece menor custo, maior alcance e mensuração precisa, combinando todas essas vantagens.",
          difficulty: 'easy' as const
        },
        {
          question: "O que significa ROI no marketing digital?",
          options: ["Return on Investment", "Rate of Interest", "Reach of Influence", "Revenue of Internet"],
          correct: 0,
          explanation: "ROI significa Return on Investment (Retorno sobre Investimento), uma métrica crucial para avaliar a eficácia das campanhas.",
          difficulty: 'easy' as const
        }
      ]
    },
    checklist: [
      { id: 1, text: "Definir objetivos SMART para sua estratégia digital", completed: false, priority: 'high' as const },
      { id: 2, text: "Identificar seu público-alvo e criar personas", completed: false, priority: 'high' as const },
      { id: 3, text: "Escolher os canais digitais mais adequados", completed: false, priority: 'medium' as const },
      { id: 4, text: "Configurar ferramentas de análise (Google Analytics)", completed: false, priority: 'high' as const },
      { id: 5, text: "Estabelecer KPIs para cada canal", completed: false, priority: 'medium' as const }
    ]
  },
  {
    id: 2,
    title: "Estratégias de Tráfego Pago",
    level: "Iniciante",
    estimatedTime: "20 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Dominando o Tráfego Pago</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">O tráfego pago é uma das formas mais eficazes de gerar resultados rápidos no marketing digital. Com investimento direcionado, você pode alcançar seu público ideal no momento certo.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Principais Plataformas:</h3>
      
      <div class="space-y-4 mb-6">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <h4 class="font-bold mb-2">🔍 Google Ads</h4>
          <p class="text-sm">Capture usuários com intenção de compra através de palavras-chave estratégicas.</p>
          <ul class="text-sm mt-2 space-y-1">
            <li>• Rede de Pesquisa: anúncios nos resultados do Google</li>
            <li>• Rede Display: banners em sites parceiros</li>
            <li>• YouTube Ads: vídeos promocionais</li>
          </ul>
        </div>
        
        <div class="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-4 rounded-lg">
          <h4 class="font-bold mb-2">📱 Meta Ads (Facebook/Instagram)</h4>
          <p class="text-sm">Segmentação avançada baseada em interesses e comportamentos.</p>
          <ul class="text-sm mt-2 space-y-1">
            <li>• Feed: anúncios no feed principal</li>
            <li>• Stories: conteúdo imersivo</li>
            <li>• Reels: vídeos curtos virais</li>
          </ul>
        </div>
        
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
          <h4 class="font-bold mb-2">🎥 YouTube Ads</h4>
          <p class="text-sm">Engajamento através de conteúdo visual e storytelling.</p>
          <ul class="text-sm mt-2 space-y-1">
            <li>• TrueView: anúncios puláveis</li>
            <li>• Bumper: anúncios de 6 segundos</li>
            <li>• Discovery: aparecem nas pesquisas</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Estrutura de Campanha Vencedora:</h3>
      <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg mb-4">
        <ol class="list-decimal pl-6 space-y-2 text-gray-700">
          <li><strong>Pesquisa de Palavras-chave:</strong> Use ferramentas como Google Keyword Planner</li>
          <li><strong>Segmentação Precisa:</strong> Defina demografia, interesses e comportamentos</li>
          <li><strong>Criativos Impactantes:</strong> Imagens/vídeos que chamem atenção</li>
          <li><strong>Landing Pages Otimizadas:</strong> Páginas focadas na conversão</li>
          <li><strong>Testes A/B:</strong> Compare diferentes versões dos anúncios</li>
          <li><strong>Otimização Contínua:</strong> Ajuste baseado nos dados</li>
        </ol>
      </div>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Erros Comuns a Evitar:</h4>
        <ul class="text-yellow-700 space-y-1">
          <li>• Não definir objetivos claros antes de começar</li>
          <li>• Segmentação muito ampla ou muito restrita</li>
          <li>• Ignorar dados e métricas importantes</li>
          <li>• Não testar diferentes criativos</li>
          <li>• Desistir muito cedo dos testes</li>
        </ul>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual é a principal vantagem do Google Ads?",
          options: ["Baixo custo", "Captura intenção de compra", "Fácil configuração", "Alcance global"],
          correct: 1,
          explanation: "O Google Ads captura usuários no momento exato em que estão buscando por produtos ou serviços, demonstrando alta intenção de compra.",
          difficulty: 'medium' as const
        },
        {
          question: "O que são testes A/B em tráfego pago?",
          options: ["Testar duas plataformas", "Comparar diferentes versões de anúncios", "Testar horários", "Comparar públicos"],
          correct: 1,
          explanation: "Testes A/B comparam diferentes versões de anúncios para identificar qual performa melhor, otimizando os resultados.",
          difficulty: 'medium' as const
        }
      ]
    },
    checklist: [
      { id: 6, text: "Definir orçamento diário e total da campanha", completed: false, priority: 'high' as const },
      { id: 7, text: "Pesquisar e selecionar palavras-chave relevantes", completed: false, priority: 'high' as const },
      { id: 8, text: "Criar pelo menos 3 variações de anúncios", completed: false, priority: 'medium' as const },
      { id: 9, text: "Configurar conversões e pixels de rastreamento", completed: false, priority: 'high' as const },
      { id: 10, text: "Preparar landing pages otimizadas", completed: false, priority: 'high' as const }
    ]
  },
  {
    id: 3,
    title: "Casos de Sucesso e Exemplos Práticos",
    level: "Intermediário",
    estimatedTime: "25 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Casos de Sucesso Reais</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Aprenda com campanhas que geraram resultados extraordinários e descubra as estratégias por trás do sucesso.</p>
      
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center mb-4">
            <div class="bg-green-100 p-2 rounded-full mr-3">
              <Award class="w-5 h-5 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-800">E-commerce de Moda - ROI 400%</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 class="font-semibold text-gray-700 mb-2">Desafio:</h4>
              <p class="text-sm text-gray-600">Loja online com baixas vendas e alto custo de aquisição de clientes.</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-700 mb-2">Solução:</h4>
              <p class="text-sm text-gray-600">Campanhas segmentadas no Facebook Ads com remarketing inteligente.</p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-semibold text-gray-700 mb-2">Estratégia Implementada:</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Pixel do Facebook instalado em todas as páginas</li>
              <li>• Campanhas de remarketing para visitantes que não compraram</li>
              <li>• Lookalike audiences baseadas nos melhores clientes</li>
              <li>• Criativos dinâmicos mostrando produtos visualizados</li>
              <li>• Testes A/B constantes em textos e imagens</li>
            </ul>
          </div>
          
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-green-50 p-3 rounded-lg">
              <div class="text-2xl font-bold text-green-600">400%</div>
              <div class="text-sm text-green-700">ROI</div>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">-60%</div>
              <div class="text-sm text-blue-700">CAC</div>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">+250%</div>
              <div class="text-sm text-purple-700">Vendas</div>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center mb-4">
            <div class="bg-blue-100 p-2 rounded-full mr-3">
              <Users class="w-5 h-5 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-800">SaaS B2B - 300% Aumento em Leads</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 class="font-semibold text-gray-700 mb-2">Desafio:</h4>
              <p class="text-sm text-gray-600">Software B2B precisava gerar mais leads qualificados para o time de vendas.</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-700 mb-2">Solução:</h4>
              <p class="text-sm text-gray-600">Estratégia integrada Google Ads + LinkedIn Ads + Marketing de Conteúdo.</p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-semibold text-gray-700 mb-2">Táticas Utilizadas:</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Google Ads focado em palavras-chave de alta intenção</li>
              <li>• LinkedIn Ads segmentado por cargo e empresa</li>
              <li>• Landing pages específicas para cada persona</li>
              <li>• Nutrição de leads via email marketing</li>
              <li>• Webinars educativos como isca digital</li>
            </ul>
          </div>
          
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-green-50 p-3 rounded-lg">
              <div class="text-2xl font-bold text-green-600">+300%</div>
              <div class="text-sm text-green-700">Leads</div>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">45%</div>
              <div class="text-sm text-blue-700">Taxa Conversão</div>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">-40%</div>
              <div class="text-sm text-purple-700">CPL</div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🎯 Lições Aprendidas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-gray-700 mb-2">O que Funciona:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Segmentação precisa do público</li>
                <li>• Testes constantes de criativos</li>
                <li>• Remarketing bem estruturado</li>
                <li>• Landing pages otimizadas</li>
                <li>• Acompanhamento de métricas</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-gray-700 mb-2">Erros a Evitar:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Público muito amplo</li>
                <li>• Não testar suficiente</li>
                <li>• Ignorar dados móveis</li>
                <li>• Campanhas sem objetivo claro</li>
                <li>• Desistir muito cedo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual foi o principal fator de sucesso no caso do e-commerce de moda?",
          options: ["Preços baixos", "Remarketing inteligente", "Muitos produtos", "Entrega rápida"],
          correct: 1,
          explanation: "O remarketing inteligente foi crucial, permitindo reconquistar visitantes que não compraram na primeira visita.",
          difficulty: 'medium' as const
        },
        {
          question: "No caso B2B, qual plataforma foi mais eficaz para gerar leads qualificados?",
          options: ["Facebook", "Google Ads", "LinkedIn", "Todas igualmente"],
          correct: 3,
          explanation: "A estratégia integrada usando Google Ads, LinkedIn e marketing de conteúdo foi o que gerou os melhores resultados.",
          difficulty: 'hard' as const
        }
      ]
    },
    checklist: [
      { id: 11, text: "Analisar casos de sucesso do seu nicho", completed: false, priority: 'medium' as const },
      { id: 12, text: "Identificar táticas aplicáveis ao seu negócio", completed: false, priority: 'high' as const },
      { id: 13, text: "Implementar pixel de rastreamento", completed: false, priority: 'high' as const },
      { id: 14, text: "Configurar campanhas de remarketing", completed: false, priority: 'high' as const },
      { id: 15, text: "Criar lookalike audiences", completed: false, priority: 'medium' as const }
    ]
  },
  {
    id: 4,
    title: "Ferramentas e Recursos Essenciais",
    level: "Intermediário",
    estimatedTime: "18 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Arsenal de Ferramentas do Profissional</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Conheça as ferramentas indispensáveis para criar, gerenciar e otimizar suas campanhas de marketing digital com máxima eficiência.</p>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">📊 Análise e Métricas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Google Analytics 4</h4>
              <p class="text-sm mb-2">Análise completa do comportamento dos usuários</p>
              <ul class="text-xs space-y-1">
                <li>• Funis de conversão</li>
                <li>• Análise de audiência</li>
                <li>• Relatórios personalizados</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Google Search Console</h4>
              <p class="text-sm mb-2">Monitoramento de performance orgânica</p>
              <ul class="text-xs space-y-1">
                <li>• Palavras-chave orgânicas</li>
                <li>• Erros de indexação</li>
                <li>• Core Web Vitals</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎯 Gestão de Campanhas</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Google Ads Editor</h4>
              <p class="text-sm">Gestão offline de campanhas Google</p>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Facebook Business Manager</h4>
              <p class="text-sm">Central de controle Meta Ads</p>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Hootsuite/Buffer</h4>
              <p class="text-sm">Agendamento de posts sociais</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🔍 Pesquisa e Planejamento</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">SEMrush/Ahrefs</h4>
              <p class="text-sm mb-2">Pesquisa de palavras-chave e concorrência</p>
              <ul class="text-xs space-y-1">
                <li>• Análise de concorrentes</li>
                <li>• Volume de busca</li>
                <li>• Dificuldade de rankeamento</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Google Keyword Planner</h4>
              <p class="text-sm mb-2">Planejamento de palavras-chave gratuito</p>
              <ul class="text-xs space-y-1">
                <li>• Ideias de palavras-chave</li>
                <li>• Estimativas de tráfego</li>
                <li>• Previsões de orçamento</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🎨 Criação de Conteúdo</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen class="w-6 h-6 text-red-600" />
              </div>
              <h4 class="font-semibold text-gray-800">Canva Pro</h4>
              <p class="text-sm text-gray-600">Design gráfico simplificado</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen class="w-6 h-6 text-blue-600" />
              </div>
              <h4 class="font-semibold text-gray-800">Figma</h4>
              <p class="text-sm text-gray-600">Design colaborativo</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Video class="w-6 h-6 text-green-600" />
              </div>
              <h4 class="font-semibold text-gray-800">Loom</h4>
              <p class="text-sm text-gray-600">Gravação de tela</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border border-orange-200">
          <h3 class="text-xl font-bold text-gray-800 mb-4">📚 Recursos de Aprendizado</h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <ExternalLink class="w-5 h-5 text-orange-600" />
              <div>
                <h4 class="font-semibold text-gray-800">Google Skillshop</h4>
                <p class="text-sm text-gray-600">Certificações gratuitas Google Ads e Analytics</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <ExternalLink class="w-5 h-5 text-orange-600" />
              <div>
                <h4 class="font-semibold text-gray-800">Facebook Blueprint</h4>
                <p class="text-sm text-gray-600">Cursos oficiais de marketing no Facebook e Instagram</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <ExternalLink class="w-5 h-5 text-orange-600" />
              <div>
                <h4 class="font-semibold text-gray-800">HubSpot Academy</h4>
                <p class="text-sm text-gray-600">Certificações em inbound marketing e vendas</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-900 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">⚡ Dica Pro: Stack Tecnológico Completo</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-3 text-yellow-400">Para Iniciantes:</h4>
              <ul class="space-y-2 text-sm">
                <li>• Google Analytics + Google Ads</li>
                <li>• Facebook Business Manager</li>
                <li>• Canva para criativos</li>
                <li>• Google Keyword Planner</li>
                <li>• Mailchimp para email marketing</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-yellow-400">Para Avançados:</h4>
              <ul class="space-y-2 text-sm">
                <li>• SEMrush/Ahrefs para pesquisa</li>
                <li>• Hotjar para análise de comportamento</li>
                <li>• Zapier para automações</li>
                <li>• Tableau para visualização de dados</li>
                <li>• HubSpot para CRM e automação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual ferramenta é essencial para análise de comportamento dos usuários no site?",
          options: ["Google Ads", "Google Analytics", "Facebook Ads", "Canva"],
          correct: 1,
          explanation: "Google Analytics é a ferramenta fundamental para entender como os usuários interagem com seu site e campanhas.",
          difficulty: 'easy' as const
        },
        {
          question: "Para pesquisa de palavras-chave gratuita, qual ferramenta do Google usar?",
          options: ["Google Analytics", "Google Search Console", "Google Keyword Planner", "Google Ads Editor"],
          correct: 2,
          explanation: "Google Keyword Planner é a ferramenta gratuita do Google para pesquisa de palavras-chave e planejamento de campanhas.",
          difficulty: 'medium' as const
        }
      ]
    },
    checklist: [
      { id: 16, text: "Configurar Google Analytics 4 no seu site", completed: false, priority: 'high' as const },
      { id: 17, text: "Instalar Google Search Console", completed: false, priority: 'high' as const },
      { id: 18, text: "Criar conta no Google Keyword Planner", completed: false, priority: 'medium' as const },
      { id: 19, text: "Configurar Facebook Business Manager", completed: false, priority: 'high' as const },
      { id: 20, text: "Escolher ferramenta de design (Canva/Figma)", completed: false, priority: 'low' as const }
    ]
  },
  {
    id: 5,
    title: "Otimização e Escalabilidade",
    level: "Intermediário",
    estimatedTime: "22 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Escalando Seus Resultados</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Aprenda como otimizar suas campanhas para máxima performance e escalar seus resultados de forma sustentável e lucrativa.</p>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🚀 Estratégias de Otimização</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Otimização de Lances</h4>
              <ul class="text-sm space-y-1">
                <li>• Lances automáticos vs manuais</li>
                <li>• Estratégias de CPA alvo</li>
                <li>• Ajustes por dispositivo e horário</li>
                <li>• Modificadores de lance por localização</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Otimização de Criativos</h4>
              <ul class="text-sm space-y-1">
                <li>• Testes A/B sistemáticos</li>
                <li>• Rotação de anúncios otimizada</li>
                <li>• Análise de elementos visuais</li>
                <li>• Personalização por audiência</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">📊 Métricas de Performance Avançadas</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-blue-600 mb-2">ROAS</div>
              <p class="text-sm text-blue-700 mb-2">Return on Ad Spend</p>
              <p class="text-xs text-gray-600">Receita ÷ Investimento em Ads</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-green-600 mb-2">LTV</div>
              <p class="text-sm text-green-700 mb-2">Lifetime Value</p>
              <p class="text-xs text-gray-600">Valor total do cliente</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-purple-600 mb-2">CAC</div>
              <p class="text-sm text-purple-700 mb-2">Customer Acquisition Cost</p>
              <p class="text-xs text-gray-600">Custo para adquirir cliente</p>
            </div>
          </div>
          
          <div class="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">💡 Fórmula do Sucesso:</h4>
            <p class="text-sm text-gray-700">LTV ÷ CAC ≥ 3:1 (idealmente 5:1 ou mais)</p>
            <p class="text-xs text-gray-600 mt-1">Se o valor vitalício do cliente for 3x maior que o custo de aquisição, sua campanha é sustentável.</p>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">📈 Estratégias de Escalabilidade</h3>
          <div class="space-y-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">1. Escalabilidade Vertical</h4>
              <p class="text-sm mb-2">Aumentar investimento nas campanhas que já funcionam</p>
              <ul class="text-xs space-y-1">
                <li>• Aumentar orçamento gradualmente (20-30% por vez)</li>
                <li>• Expandir palavras-chave relacionadas</li>
                <li>• Testar novos criativos na mesma audiência</li>
              </ul>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">2. Escalabilidade Horizontal</h4>
              <p class="text-sm mb-2">Expandir para novos canais e audiências</p>
              <ul class="text-xs space-y-1">
                <li>• Testar novas plataformas (TikTok, Pinterest, LinkedIn)</li>
                <li>• Criar lookalike audiences maiores</li>
                <li>• Expandir para novos mercados geográficos</li>
              </ul>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">3. Escalabilidade de Produto</h4>
              <p class="text-sm mb-2">Aumentar valor por cliente</p>
              <ul class="text-xs space-y-1">
                <li>• Upsells e cross-sells</li>
                <li>• Programas de fidelidade</li>
                <li>• Produtos complementares</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-4">⚠️ Armadilhas da Escalabilidade</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-red-600 mb-2">❌ O que NÃO fazer:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Escalar muito rápido (>50% de aumento)</li>
                <li>• Ignorar saturação de audiência</li>
                <li>• Não monitorar qualidade dos leads</li>
                <li>• Escalar campanhas com ROAS baixo</li>
                <li>• Não testar antes de escalar</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-green-600 mb-2">✅ Melhores Práticas:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Escalar gradualmente (20-30%)</li>
                <li>• Monitorar métricas diariamente</li>
                <li>• Manter reserva de orçamento para testes</li>
                <li>• Diversificar canais de aquisição</li>
                <li>• Automatizar o que for possível</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-900 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎯 Checklist de Escalabilidade</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-3 text-yellow-400">Antes de Escalar:</h4>
              <ul class="space-y-2 text-sm">
                <li>• ✓ ROAS consistente por 7+ dias</li>
                <li>• ✓ Volume de conversões estável</li>
                <li>• ✓ Qualidade dos leads validada</li>
                <li>• ✓ Capacidade operacional adequada</li>
                <li>• ✓ Orçamento disponível para testes</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-yellow-400">Durante a Escalabilidade:</h4>
              <ul class="space-y-2 text-sm">
                <li>• ✓ Monitoramento diário de métricas</li>
                <li>• ✓ Testes A/B contínuos</li>
                <li>• ✓ Ajustes baseados em dados</li>
                <li>• ✓ Diversificação de criativos</li>
                <li>• ✓ Backup de campanhas funcionais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual é a proporção ideal entre LTV e CAC?",
          options: ["1:1", "2:1", "3:1 ou mais", "Não importa"],
          correct: 2,
          explanation: "A proporção ideal é LTV:CAC de 3:1 ou mais, preferencialmente 5:1, garantindo sustentabilidade e lucratividade.",
          difficulty: 'hard' as const
        },
        {
          question: "Qual é o aumento máximo recomendado ao escalar uma campanha?",
          options: ["10%", "30%", "50%", "100%"],
          correct: 1,
          explanation: "O aumento recomendado é de 20-30% por vez para evitar instabilidade e perda de performance da campanha.",
          difficulty: 'medium' as const
        }
      ]
    },
    checklist: [
      { id: 21, text: "Calcular LTV e CAC dos seus clientes", completed: false, priority: 'high' as const },
      { id: 22, text: "Definir ROAS mínimo aceitável", completed: false, priority: 'high' as const },
      { id: 23, text: "Criar sistema de monitoramento diário", completed: false, priority: 'medium' as const },
      { id: 24, text: "Preparar criativos para testes A/B", completed: false, priority: 'medium' as const },
      { id: 25, text: "Estabelecer processo de escalabilidade gradual", completed: false, priority: 'high' as const }
    ]
  },
  {
    id: 6,
    title: "Automação e Inteligência Artificial",
    level: "Avançado",
    estimatedTime: "30 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">O Futuro do Marketing Digital: IA e Automação</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Descubra como a inteligência artificial e automação estão revolucionando o marketing digital, permitindo campanhas mais eficientes, personalizadas e escaláveis.</p>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🤖 Automação de Campanhas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Smart Bidding (Google Ads)</h4>
              <ul class="text-sm space-y-1">
                <li>• Target CPA: otimiza para custo por aquisição</li>
                <li>• Target ROAS: maximiza retorno sobre investimento</li>
                <li>• Maximize Conversions: mais conversões no orçamento</li>
                <li>• Enhanced CPC: ajustes automáticos de lance</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Meta Advantage+ (Facebook)</h4>
              <ul class="text-sm space-y-1">
                <li>• Audience expansion automática</li>
                <li>• Placements otimizados por IA</li>
                <li>• Creative testing automatizado</li>
                <li>• Budget optimization dinâmica</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🧠 IA para Personalização</h3>
          <div class="space-y-4">
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-2">Dynamic Creative Optimization (DCO)</h4>
              <p class="text-sm text-purple-700 mb-2">Criação automática de anúncios personalizados em tempo real</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">Headlines</h5>
                  <p class="text-xs text-gray-600">Títulos adaptados ao perfil</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">Imagens</h5>
                  <p class="text-xs text-gray-600">Visuais por interesse</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">CTAs</h5>
                  <p class="text-xs text-gray-600">Chamadas otimizadas</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">Predictive Analytics</h4>
              <p class="text-sm text-green-700 mb-2">Previsão de comportamento do usuário usando machine learning</p>
              <ul class="text-sm text-green-700 space-y-1">
                <li>• Probabilidade de conversão por usuário</li>
                <li>• Lifetime Value prediction</li>
                <li>• Churn prediction e retenção</li>
                <li>• Optimal timing para remarketing</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">⚡ Ferramentas de Automação Avançada</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Marketing Automation</h4>
              <ul class="text-sm space-y-1">
                <li>• HubSpot: workflows complexos</li>
                <li>• Marketo: lead scoring avançado</li>
                <li>• ActiveCampaign: automação comportamental</li>
                <li>• Klaviyo: e-commerce automation</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">AI-Powered Tools</h4>
              <ul class="text-sm space-y-1">
                <li>• Copy.ai: geração de textos</li>
                <li>• Jasper: conteúdo otimizado</li>
                <li>• Midjourney: criação de imagens</li>
                <li>• ChatGPT: assistente de marketing</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 border border-gray-200 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🎯 Implementação Prática</h3>
          <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <h4 class="font-semibold text-gray-800 mb-2">Fase 1: Automação Básica (Semanas 1-2)</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Configurar Smart Bidding no Google Ads</li>
                <li>• Ativar Advantage+ no Facebook</li>
                <li>• Implementar remarketing automático</li>
                <li>• Configurar email automation básica</li>
              </ul>
            </div>
            
            <div class="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h4 class="font-semibold text-gray-800 mb-2">Fase 2: IA Intermediária (Semanas 3-4)</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Implementar Dynamic Creative Optimization</li>
                <li>• Configurar lead scoring automático</li>
                <li>• Usar IA para geração de conteúdo</li>
                <li>• Implementar chatbots inteligentes</li>
              </ul>
            </div>
            
            <div class="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <h4 class="font-semibold text-gray-800 mb-2">Fase 3: Automação Avançada (Semanas 5-8)</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Predictive analytics para LTV</li>
                <li>• Cross-channel attribution modeling</li>
                <li>• Automated A/B testing</li>
                <li>• Real-time personalization</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🚀 Casos de Uso Avançados</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-3 text-yellow-400">E-commerce Inteligente:</h4>
              <ul class="space-y-2 text-sm">
                <li>• Recomendações de produto por IA</li>
                <li>• Pricing dinâmico baseado em demanda</li>
                <li>• Inventory-based ad optimization</li>
                <li>• Abandoned cart recovery inteligente</li>
                <li>• Seasonal trend prediction</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-yellow-400">B2B Lead Generation:</h4>
              <ul class="space-y-2 text-sm">
                <li>• Intent data para targeting</li>
                <li>• Account-based marketing automation</li>
                <li>• Sales-ready lead identification</li>
                <li>• Automated nurturing sequences</li>
                <li>• Predictive lead scoring</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-300 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-4">⚠️ Cuidados com Automação</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-red-600 mb-2">❌ Armadilhas Comuns:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Over-automation sem supervisão humana</li>
                <li>• Dados insuficientes para IA funcionar</li>
                <li>• Não testar antes de automatizar</li>
                <li>• Ignorar feedback dos usuários</li>
                <li>• Automação sem estratégia clara</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-green-600 mb-2">✅ Melhores Práticas:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Começar simples e evoluir gradualmente</li>
                <li>• Manter controle humano em decisões críticas</li>
                <li>• Monitorar performance constantemente</li>
                <li>• Ter dados de qualidade como base</li>
                <li>• Testar automações em pequena escala</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual é a principal vantagem do Smart Bidding no Google Ads?",
          options: ["Menor custo", "Otimização automática baseada em dados", "Mais controle manual", "Interface mais simples"],
          correct: 1,
          explanation: "Smart Bidding usa machine learning para otimizar lances automaticamente baseado em sinais de conversão em tempo real.",
          difficulty: 'hard' as const
        },
        {
          question: "O que é Dynamic Creative Optimization (DCO)?",
          options: ["Otimização de orçamento", "Criação automática de anúncios personalizados", "Análise de concorrentes", "Gestão de campanhas"],
          correct: 1,
          explanation: "DCO cria automaticamente anúncios personalizados em tempo real, combinando diferentes elementos criativos baseado no perfil do usuário.",
          difficulty: 'hard' as const
        },
        {
          question: "Qual ferramenta é mais adequada para automação de e-commerce?",
          options: ["HubSpot", "Klaviyo", "Marketo", "ActiveCampaign"],
          correct: 1,
          explanation: "Klaviyo é especializada em automação para e-commerce, com recursos específicos para abandoned cart, product recommendations e customer lifecycle.",
          difficulty: 'medium' as const
        }
      ]
    },
    checklist: [
      { id: 26, text: "Configurar Smart Bidding em campanhas Google Ads", completed: false, priority: 'high' as const },
      { id: 27, text: "Ativar Advantage+ Shopping no Facebook", completed: false, priority: 'high' as const },
      { id: 28, text: "Implementar Dynamic Creative Optimization", completed: false, priority: 'medium' as const },
      { id: 29, text: "Configurar automação de email marketing", completed: false, priority: 'high' as const },
      { id: 30, text: "Testar ferramentas de IA para criação de conteúdo", completed: false, priority: 'low' as const },
      { id: 31, text: "Implementar chatbot inteligente no site", completed: false, priority: 'medium' as const }
    ]
  },
  {
    id: 7,
    title: "Attribution Modeling e Analytics Avançado",
    level: "Avançado",
    estimatedTime: "35 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Medindo o Que Realmente Importa</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Domine os modelos de atribuição avançados e analytics para entender verdadeiramente o impacto de cada touchpoint na jornada do cliente.</p>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-slate-600 to-gray-700 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">📊 Modelos de Atribuição</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Modelos Tradicionais</h4>
              <ul class="text-sm space-y-2">
                <li><strong>First-Click:</strong> 100% crédito ao primeiro touchpoint</li>
                <li><strong>Last-Click:</strong> 100% crédito ao último touchpoint</li>
                <li><strong>Linear:</strong> Crédito igual para todos os touchpoints</li>
                <li><strong>Time-Decay:</strong> Mais crédito para touchpoints recentes</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Modelos Avançados</h4>
              <ul class="text-sm space-y-2">
                <li><strong>Data-Driven:</strong> IA determina contribuição real</li>
                <li><strong>Position-Based:</strong> 40% primeiro, 40% último, 20% meio</li>
                <li><strong>Shapley Value:</strong> Teoria dos jogos aplicada</li>
                <li><strong>Markov Chain:</strong> Probabilidade de conversão</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🔍 Cross-Channel Attribution</h3>
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">Desafios da Atribuição Cross-Channel</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">Walled Gardens</h5>
                  <p class="text-xs text-gray-600">Facebook, Google, Amazon com dados isolados</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">Cookie Deprecation</h5>
                  <p class="text-xs text-gray-600">Fim dos cookies third-party</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">Privacy Laws</h5>
                  <p class="text-xs text-gray-600">GDPR, CCPA limitando tracking</p>
                </div>
              </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">Soluções Modernas</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Server-Side Tracking</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Google Tag Manager Server-Side</li>
                    <li>• Facebook Conversions API</li>
                    <li>• Enhanced Conversions</li>
                    <li>• First-party data collection</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Unified Analytics</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Customer Data Platforms (CDP)</li>
                    <li>• Marketing Mix Modeling (MMM)</li>
                    <li>• Incrementality Testing</li>
                    <li>• Cohort Analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎯 Advanced Analytics Setup</h3>
          <div class="space-y-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Google Analytics 4 Avançado</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h5 class="font-medium mb-1">Custom Events & Parameters</h5>
                  <ul class="text-xs space-y-1">
                    <li>• Enhanced E-commerce tracking</li>
                    <li>• Custom dimensions</li>
                    <li>• Calculated metrics</li>
                    <li>• Audience building</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium mb-1">Advanced Reporting</h5>
                  <ul class="text-xs space-y-1">
                    <li>• Exploration reports</li>
                    <li>• Funnel analysis</li>
                    <li>• Path analysis</li>
                    <li>• Cohort reports</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Data Studio & Looker</h4>
              <ul class="text-sm space-y-1">
                <li>• Dashboards executivos automatizados</li>
                <li>• Cross-platform data blending</li>
                <li>• Real-time performance monitoring</li>
                <li>• Automated reporting & alerts</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">📈 Marketing Mix Modeling (MMM)</h3>
          <div class="space-y-4">
            <div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
              <h4 class="font-semibold text-orange-800 mb-2">O que é MMM?</h4>
              <p class="text-sm text-orange-700 mb-3">Análise estatística que quantifica o impacto de diferentes canais de marketing nas vendas, considerando fatores externos como sazonalidade e economia.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">Base Incremental</h5>
                  <p class="text-xs text-gray-600">Vendas que não aconteceriam sem marketing</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">Saturation Curves</h5>
                  <p class="text-xs text-gray-600">Ponto de diminishing returns</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">Adstock Effect</h5>
                  <p class="text-xs text-gray-600">Impacto duradouro dos anúncios</p>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">Implementação Prática</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Dados Necessários</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• 2+ anos de dados históricos</li>
                    <li>• Investimento por canal/semana</li>
                    <li>• Vendas/conversões por período</li>
                    <li>• Fatores externos (economia, clima)</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Ferramentas</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Google Meridian (gratuito)</li>
                    <li>• Meta Robyn (open source)</li>
                    <li>• Nielsen MMM</li>
                    <li>• Python/R custom models</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🧪 Incrementality Testing</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Geo-Based Tests</h4>
              <ul class="text-sm space-y-1">
                <li>• Dividir mercados em test/control</li>
                <li>• Medir lift incremental</li>
                <li>• Controlar por sazonalidade</li>
                <li>• Statistical significance testing</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Holdout Tests</h4>
              <ul class="text-sm space-y-1">
                <li>• Excluir % da audiência dos anúncios</li>
                <li>• Comparar conversões test vs control</li>
                <li>• Medir true incrementality</li>
                <li>• Calcular real ROAS</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-900 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎯 Implementação Step-by-Step</h3>
          <div class="space-y-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2 text-yellow-400">Semana 1-2: Foundation</h4>
              <ul class="text-sm space-y-1">
                <li>• Implementar server-side tracking</li>
                <li>• Configurar Enhanced Conversions</li>
                <li>• Setup Facebook Conversions API</li>
                <li>• Criar custom events no GA4</li>
              </ul>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2 text-yellow-400">Semana 3-4: Advanced Analytics</h4>
              <ul class="text-sm space-y-1">
                <li>• Configurar Data-Driven Attribution</li>
                <li>• Criar dashboards cross-channel</li>
                <li>• Implementar cohort analysis</li>
                <li>• Setup automated reporting</li>
              </ul>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2 text-yellow-400">Semana 5-8: Testing & MMM</h4>
              <ul class="text-sm space-y-1">
                <li>• Planejar incrementality tests</li>
                <li>• Coletar dados para MMM</li>
                <li>• Implementar geo-based testing</li>
                <li>• Criar modelos preditivos</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-300 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-4">⚠️ Global Expansion Pitfalls</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-red-600 mb-2">❌ Common Mistakes:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• One-size-fits-all approach</li>
                <li>• Ignoring local regulations</li>
                <li>• Poor translation quality</li>
                <li>• Inadequate local support</li>
                <li>• Underestimating cultural differences</li>
                <li>• Insufficient market research</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-green-600 mb-2">✅ Success Factors:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Deep cultural understanding</li>
                <li>• Local team involvement</li>
                <li>• Gradual market entry</li>
                <li>• Continuous localization</li>
                <li>• Strong compliance framework</li>
                <li>• Patient capital allocation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual modelo de atribuição é mais preciso para campanhas multi-touch?",
          options: ["Last-Click", "First-Click", "Data-Driven", "Linear"],
          correct: 2,
          explanation: "Data-Driven Attribution usa machine learning para analisar todos os touchpoints e determinar a contribuição real de cada um para a conversão.",
          difficulty: 'hard' as const
        },
        {
          question: "O que é Marketing Mix Modeling (MMM)?",
          options: ["Modelo de atribuição", "Análise estatística de impacto dos canais", "Ferramenta de automação", "Plataforma de dados"],
          correct: 1,
          explanation: "MMM é uma análise estatística que quantifica o impacto incremental de diferentes canais de marketing nas vendas, considerando fatores externos.",
          difficulty: 'hard' as const
        },
        {
          question: "Qual é a principal vantagem do server-side tracking?",
          options: ["Mais barato", "Mais preciso e privacy-compliant", "Mais fácil de implementar", "Mais rápido"],
          correct: 1,
          explanation: "Server-side tracking é mais preciso pois não depende de cookies do browser e é mais compatível com regulamentações de privacidade.",
          difficulty: 'medium' as const
        }
      ]
    },
    checklist: [
      { id: 32, text: "Implementar Google Tag Manager Server-Side", completed: false, priority: 'high' as const },
      { id: 33, text: "Configurar Facebook Conversions API", completed: false, priority: 'high' as const },
      { id: 34, text: "Ativar Data-Driven Attribution no Google Ads", completed: false, priority: 'medium' as const },
      { id: 35, text: "Criar dashboard cross-channel no Data Studio", completed: false, priority: 'medium' as const },
      { id: 36, text: "Planejar primeiro incrementality test", completed: false, priority: 'high' as const },
      { id: 37, text: "Coletar dados históricos para MMM", completed: false, priority: 'low' as const }
    ]
  },
  {
    id: 8,
    title: "Growth Hacking e Estratégias Disruptivas",
    level: "Avançado",
    estimatedTime: "28 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Crescimento Exponencial com Growth Hacking</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Descubra as estratégias não-convencionais que startups unicórnio usaram para crescer rapidamente, e como aplicar growth hacking no seu negócio.</p>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🚀 Fundamentos do Growth Hacking</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Mindset Growth</h4>
              <ul class="text-sm space-y-1">
                <li>• Experimentação constante</li>
                <li>• Data-driven decisions</li>
                <li>• Foco em métricas que importam</li>
                <li>• Velocidade de execução</li>
                <li>• Pensamento não-linear</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">AARRR Framework</h4>
              <ul class="text-sm space-y-1">
                <li>• <strong>Acquisition:</strong> Como chegam até você</li>
                <li>• <strong>Activation:</strong> Primeira experiência positiva</li>
                <li>• <strong>Retention:</strong> Voltam a usar o produto</li>
                <li>• <strong>Revenue:</strong> Começam a pagar</li>
                <li>• <strong>Referral:</strong> Indicam para outros</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">💡 Táticas de Growth Hacking Comprovadas</h3>
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">Viral Loops & Network Effects</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">Dropbox Model</h5>
                  <p class="text-xs text-gray-600">Espaço grátis por indicação</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">Uber Model</h5>
                  <p class="text-xs text-gray-600">Créditos para quem indica e é indicado</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">LinkedIn Model</h5>
                  <p class="text-xs text-gray-600">Valor aumenta com mais conexões</p>
                </div>
              </div>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-2">Product-Led Growth (PLG)</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Freemium Strategy</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Slack: gratuito até 10k mensagens</li>
                    <li>• Zoom: 40 min grátis para grupos</li>
                    <li>• Canva: templates básicos gratuitos</li>
                    <li>• Spotify: ads entre músicas</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Free Trial Optimization</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Onboarding progressivo</li>
                    <li>• Time-to-value reduzido</li>
                    <li>• Feature discovery guided</li>
                    <li>• Usage-based triggers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎯 Growth Experiments Framework</h3>
          <div class="space-y-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">ICE Scoring Method</h4>
              <div class="grid grid-cols-3 gap-3">
                <div class="text-center">
                  <div class="text-2xl font-bold mb-1">I</div>
                  <div class="text-sm">Impact</div>
                  <div class="text-xs opacity-80">Potencial de resultado</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold mb-1">C</div>
                  <div class="text-sm">Confidence</div>
                  <div class="text-xs opacity-80">Certeza de sucesso</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold mb-1">E</div>
                  <div class="text-sm">Ease</div>
                  <div class="text-xs opacity-80">Facilidade de implementar</div>
                </div>
              </div>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Processo de Experimentação</h4>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                <div class="bg-white/10 p-2 rounded text-center">
                  <div class="font-medium">1. Hipótese</div>
                  <div class="text-xs opacity-80">Se fizermos X...</div>
                </div>
                <div class="bg-white/10 p-2 rounded text-center">
                  <div class="font-medium">2. Experimento</div>
                  <div class="text-xs opacity-80">Testamos Y...</div>
                </div>
                <div class="bg-white/10 p-2 rounded text-center">
                  <div class="font-medium">3. Medição</div>
                  <div class="text-xs opacity-80">Observamos Z...</div>
                </div>
                <div class="bg-white/10 p-2 rounded text-center">
                  <div class="font-medium">4. Aprendizado</div>
                  <div class="text-xs opacity-80">Descobrimos que...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🔥 Casos de Growth Hacking Famosos</h3>
          <div class="space-y-4">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">Airbnb: Craigslist Integration</h4>
              <p class="text-sm text-blue-700 mb-2">Permitiu postar automaticamente no Craigslist, aproveitando sua base de usuários</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-green-600">10x</div>
                  <div class="text-xs text-gray-600">Aumento em listagens</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-blue-600">$0</div>
                  <div class="text-xs text-gray-600">Custo de aquisição</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-purple-600">Viral</div>
                  <div class="text-xs text-gray-600">Crescimento orgânico</div>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">Hotmail: Email Signature</h4>
              <p class="text-sm text-green-700 mb-2">"Get your free email at Hotmail" em cada email enviado</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-green-600">12M</div>
                  <div class="text-xs text-gray-600">Usuários em 18 meses</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-blue-600">$500K</div>
                  <div class="text-xs text-gray-600">Total investido</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-purple-600">$400M</div>
                  <div class="text-xs text-gray-600">Vendido para Microsoft</div>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-2">Instagram: Photo Filters</h4>
              <p class="text-sm text-purple-700 mb-2">Foco em uma feature que fazia fotos comuns parecerem profissionais</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-green-600">1M</div>
                  <div class="text-xs text-gray-600">Usuários em 2 meses</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-blue-600">100M</div>
                  <div class="text-xs text-gray-600">Usuários em 2 anos</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-purple-600">$1B</div>
                  <div class="text-xs text-gray-600">Vendido para Facebook</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🛠️ Growth Stack Essencial</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Analytics & Testing</h4>
              <ul class="text-sm space-y-1">
                <li>• Amplitude: product analytics</li>
                <li>• Mixpanel: event tracking</li>
                <li>• Optimizely: A/B testing</li>
                <li>• Hotjar: user behavior</li>
                <li>• Segment: data pipeline</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Growth Tools</h4>
              <ul class="text-sm space-y-1">
                <li>• ReferralCandy: referral programs</li>
                <li>• Viral Loops: viral campaigns</li>
                <li>• Typeform: interactive surveys</li>
                <li>• Intercom: user onboarding</li>
                <li>• Zapier: automation workflows</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-300 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-4">⚡ Growth Hacking Playbook</h3>
          <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h4 class="font-semibold text-gray-800 mb-2">Semana 1-2: Foundation</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Mapear customer journey atual</li>
                <li>• Identificar gargalos no funil</li>
                <li>• Definir North Star Metric</li>
                <li>• Setup analytics avançado</li>
              </ul>
            </div>
            
            <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <h4 class="font-semibold text-gray-800 mb-2">Semana 3-4: Ideation</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Brainstorm de 50+ ideias</li>
                <li>• Aplicar ICE scoring</li>
                <li>• Priorizar top 10 experimentos</li>
                <li>• Criar roadmap de testes</li>
              </ul>
            </div>
            
            <div class="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <h4 class="font-semibold text-gray-800 mb-2">Semana 5-8: Execution</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Executar 2-3 experimentos/semana</li>
                <li>• Medir resultados rigorosamente</li>
                <li>• Iterar baseado em aprendizados</li>
                <li>• Escalar experimentos vencedores</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-900 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎯 Growth Metrics que Importam</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-green-400 mb-2">Viral Coefficient</div>
              <p class="text-sm mb-2">Quantos usuários cada usuário traz</p>
              <p class="text-xs opacity-80">K = i × c (invites × conversion)</p>
            </div>
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-blue-400 mb-2">Time to Value</div>
              <p class="text-sm mb-2">Tempo até primeira experiência positiva</p>
              <p class="text-xs opacity-80">Quanto menor, melhor</p>
            </div>
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-purple-400 mb-2">Product-Market Fit</div>
              <p class="text-sm mb-2">% usuários "muito decepcionados" sem produto</p>
              <p class="text-xs opacity-80">>40% = strong PMF</p>
            </div>
          </div>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "O que significa o 'K' no viral coefficient?",
          options: ["Número de usuários", "Invites × conversion rate", "Custo por usuário", "Tempo de retenção"],
          correct: 1,
          explanation: "Viral coefficient (K) = número de convites enviados × taxa de conversão dos convites. K > 1 significa crescimento viral.",
          difficulty: 'hard' as const
        },
        {
          question: "Qual é o framework mais usado para growth hacking?",
          options: ["SMART", "AARRR", "OKR", "KPI"],
          correct: 1,
          explanation: "AARRR (Acquisition, Activation, Retention, Revenue, Referral) é o framework clássico para growth hacking, cobrindo todo o funil.",
          difficulty: 'medium' as const
        },
        {
          question: "O que é Product-Market Fit segundo Sean Ellis?",
          options: ["Produto perfeito", ">40% usuários 'muito decepcionados' sem produto", "ROI positivo", "Crescimento de 100%"],
          correct: 1,
          explanation: "Sean Ellis definiu PMF como >40% dos usuários respondendo que ficariam 'muito decepcionados' se não pudessem mais usar o produto.",
          difficulty: 'hard' as const
        }
      ]
    },
    checklist: [
      { id: 38, text: "Mapear customer journey completo", completed: false, priority: 'high' as const },
      { id: 39, text: "Definir North Star Metric do negócio", completed: false, priority: 'high' as const },
      { id: 40, text: "Implementar analytics de produto (Amplitude/Mixpanel)", completed: false, priority: 'medium' as const },
      { id: 41, text: "Criar backlog de 50+ experimentos", completed: false, priority: 'medium' as const },
      { id: 42, text: "Aplicar ICE scoring nos experimentos", completed: false, priority: 'high' as const },
      { id: 43, text: "Executar primeiro experimento viral", completed: false, priority: 'high' as const }
    ]
  },
  {
    id: 9,
    title: "Marketing de Performance Global",
    level: "Expert",
    estimatedTime: "40 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Expansão Internacional e Performance Global</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Domine as estratégias para escalar campanhas globalmente, navegando por diferentes culturas, moedas, regulamentações e comportamentos de consumo.</p>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🌍 Estratégia de Expansão Global</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Market Entry Strategy</h4>
              <ul class="text-sm space-y-1">
                <li>• Market sizing & opportunity assessment</li>
                <li>• Competitive landscape analysis</li>
                <li>• Regulatory compliance research</li>
                <li>• Local partnership evaluation</li>
                <li>• Go-to-market timeline</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Localization Framework</h4>
              <ul class="text-sm space-y-1">
                <li>• Cultural adaptation strategy</li>
                <li>• Language & translation quality</li>
                <li>• Local payment methods</li>
                <li>• Currency & pricing strategy</li>
                <li>• Customer support localization</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🎯 Platform Strategy por Região</h3>
          <div class="space-y-4">
            <div class="bg-red-50 p-4 rounded-lg">
              <h4 class="font-semibold text-red-800 mb-2">🇨🇳 China: Ecossistema Único</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">Baidu Ads</h5>
                  <p class="text-xs text-gray-600">Search engine dominante (70%)</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">WeChat Ads</h5>
                  <p class="text-xs text-gray-600">1.3B usuários ativos</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">Douyin (TikTok)</h5>
                  <p class="text-xs text-gray-600">600M usuários diários</p>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">🇪🇺 Europa: GDPR & Privacy-First</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Compliance Requirements</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• GDPR consent management</li>
                    <li>• Cookie consent banners</li>
                    <li>• Data processing agreements</li>
                    <li>• Right to be forgotten</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Platform Preferences</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Google Ads: universal presence</li>
                    <li>• Facebook: strong in Western Europe</li>
                    <li>• LinkedIn: B2B dominance</li>
                    <li>• Local players: Yandex (Russia)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">🌎 América Latina: Mobile-First</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">WhatsApp Business</h5>
                  <p class="text-xs text-gray-600">Principal canal de comunicação</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">Instagram</h5>
                  <p class="text-xs text-gray-600">Alta penetração mobile</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm mb-1">MercadoLibre</h5>
                  <p class="text-xs text-gray-600">E-commerce líder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">💰 Global Pricing & Currency Strategy</h3>
          <div class="space-y-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Purchasing Power Parity (PPP)</h4>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                <div class="bg-white/10 p-2 rounded text-center">
                  <div class="font-medium">🇺🇸 USA</div>
                  <div class="text-xs opacity-80">$100 = Baseline</div>
                </div>
                <div class="bg-white/10 p-2 rounded text-center">
                  <div class="font-medium">🇧🇷 Brazil</div>
                  <div class="text-xs opacity-80">$100 = $45 PPP</div>
                </div>
                <div class="bg-white/10 p-2 rounded text-center">
                  <div class="font-medium">🇮🇳 India</div>
                  <div class="text-xs opacity-80">$100 = $25 PPP</div>
                </div>
                <div class="bg-white/10 p-2 rounded text-center">
                  <div class="font-medium">🇩🇪 Germany</div>
                  <div class="text-xs opacity-80">$100 = $85 PPP</div>
                </div>
              </div>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Dynamic Pricing Models</h4>
              <ul class="text-sm space-y-1">
                <li>• Geographic price discrimination</li>
                <li>• Currency hedging strategies</li>
                <li>• Local competitor price matching</li>
                <li>• Seasonal demand adjustments</li>
                <li>• Economic indicator-based pricing</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🎨 Creative Localization Strategy</h3>
          <div class="space-y-4">
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold text-orange-800 mb-2">Cultural Adaptation Framework</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Visual Elements</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Color psychology por cultura</li>
                    <li>• Imagery & model selection</li>
                    <li>• Typography & reading patterns</li>
                    <li>• Symbols & icons culturais</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium text-gray-800 mb-2">Messaging Strategy</h5>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• High-context vs low-context cultures</li>
                    <li>• Direct vs indirect communication</li>
                    <li>• Local idioms & expressions</li>
                    <li>• Cultural values alignment</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">A/B Testing Global</h4>
              <p class="text-sm text-blue-700 mb-2">Estratégias para testar criativos em diferentes mercados simultaneamente</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">Parallel Testing</h5>
                  <p class="text-xs text-gray-600">Mesmo teste em múltiplos países</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">Sequential Rollout</h5>
                  <p class="text-xs text-gray-600">Teste em país piloto → expansão</p>
                </div>
                <div class="bg-white p-3 rounded border">
                  <h5 class="font-medium text-gray-800 text-sm">Cultural Variants</h5>
                  <p class="text-xs text-gray-600">Adaptações específicas por região</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">📊 Global Performance Measurement</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Cross-Border Attribution</h4>
              <ul class="text-sm space-y-1">
                <li>• Multi-currency conversion tracking</li>
                <li>• Time zone normalization</li>
                <li>• Cross-device user journey</li>
                <li>• Regional data privacy compliance</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Global KPI Dashboard</h4>
              <ul class="text-sm space-y-1">
                <li>• Revenue per geography</li>
                <li>• CAC by market maturity</li>
                <li>• LTV:CAC ratio por região</li>
                <li>• Market penetration metrics</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🚀 Casos de Expansão Global</h3>
          <div class="space-y-4">
            <div class="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg">
              <h4 class="font-semibold text-red-800 mb-2">Netflix: Localization at Scale</h4>
              <p class="text-sm text-red-700 mb-2">Como a Netflix adaptou sua estratégia para 190+ países</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-green-600">30+</div>
                  <div class="text-xs text-gray-600">Idiomas suportados</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-blue-600">70%</div>
                  <div class="text-xs text-gray-600">Conteúdo local por região</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-purple-600">$15B</div>
                  <div class="text-xs text-gray-600">Investimento em conteúdo global</div>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">Spotify: Regional Music Strategy</h4>
              <p class="text-sm text-blue-700 mb-2">Adaptação para gostos musicais locais e descoberta cultural</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-green-600">180+</div>
                  <div class="text-xs text-gray-600">Países ativos</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-blue-600">60+</div>
                  <div class="text-xs text-gray-600">Idiomas de interface</div>
                </div>
                <div class="bg-white p-3 rounded border">
                  <div class="text-lg font-bold text-purple-600">4B+</div>
                  <div class="text-xs text-gray-600">Playlists regionais</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-900 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎯 Global Expansion Roadmap</h3>
          <div class="space-y-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2 text-yellow-400">Fase 1: Market Research (Mês 1-2)</h4>
              <ul class="text-sm space-y-1">
                <li>• TAM/SAM analysis por região</li>
                <li>• Competitive intelligence gathering</li>
                <li>• Regulatory compliance assessment</li>
                <li>• Cultural research & insights</li>
              </ul>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2 text-yellow-400">Fase 2: Pilot Launch (Mês 3-4)</h4>
              <ul class="text-sm space-y-1">
                <li>• Select 1-2 pilot markets</li>
                <li>• Localize core product/service</li>
                <li>• Launch minimal viable campaigns</li>
                <li>• Establish local partnerships</li>
              </ul>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2 text-yellow-400">Fase 3: Scale & Optimize (Mês 5-12)</h4>
              <ul class="text-sm space-y-1">
                <li>• Expand to additional markets</li>
                <li>• Optimize based on pilot learnings</li>
                <li>• Build local teams & operations</li>
                <li>• Implement global performance framework</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-300 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-gray-800 mb-4">⚠️ Global Expansion Pitfalls</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-red-600 mb-2">❌ Common Mistakes:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• One-size-fits-all approach</li>
                <li>• Ignoring local regulations</li>
                <li>• Poor translation quality</li>
                <li>• Inadequate local support</li>
                <li>• Underestimating cultural differences</li>
                <li>• Insufficient market research</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-green-600 mb-2">✅ Success Factors:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Deep cultural understanding</li>
                <li>• Local team involvement</li>
                <li>• Gradual market entry</li>
                <li>• Continuous localization</li>
                <li>• Strong compliance framework</li>
                <li>• Patient capital allocation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual é o principal desafio do marketing global em 2024?",
          options: ["Idiomas diferentes", "Privacy regulations & cookie deprecation", "Fusos horários", "Moedas diferentes"],
          correct: 1,
          explanation: "Privacy regulations como GDPR e a deprecação de cookies third-party são os maiores desafios para tracking e targeting global.",
          difficulty: 'hard' as const
        },
        {
          question: "O que é Purchasing Power Parity (PPP) no contexto de pricing global?",
          options: ["Taxa de câmbio", "Ajuste de preços baseado no poder de compra local", "Imposto internacional", "Custo de envio"],
          correct: 1,
          explanation: "PPP ajusta preços baseado no poder de compra local, permitindo que produtos sejam acessíveis em diferentes economias.",
          difficulty: 'medium' as const
        },
        {
          question: "Qual plataforma domina o marketing digital na China?",
          options: ["Google Ads", "Facebook Ads", "WeChat Ads", "LinkedIn Ads"],
          correct: 2,
          explanation: "WeChat Ads domina na China com 1.3B usuários ativos, já que Google e Facebook são bloqueados no país.",
          difficulty: 'medium' as const
        }
      ]
    },
    checklist: [
      { id: 44, text: "Realizar pesquisa de mercado para 3 países-alvo", completed: false, priority: 'high' as const },
      { id: 45, text: "Mapear regulamentações de privacidade por região", completed: false, priority: 'high' as const },
      { id: 46, text: "Definir estratégia de pricing com PPP", completed: false, priority: 'medium' as const },
      { id: 47, text: "Criar framework de localização cultural", completed: false, priority: 'high' as const },
      { id: 48, text: "Implementar tracking multi-currency", completed: false, priority: 'medium' as const },
      { id: 49, text: "Estabelecer parcerias locais estratégicas", completed: false, priority: 'low' as const }
    ]
  },
  {
    id: 10,
    title: "Certificação e Próximos Passos",
    level: "Conclusão",
    estimatedTime: "15 min",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Parabéns! Você Dominou o Marketing Digital</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Chegou ao final desta jornada completa de aprendizado. Agora é hora de aplicar todo conhecimento adquirido e continuar evoluindo como profissional de marketing digital.</p>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🏆 Seu Progresso Completo</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-3xl font-bold mb-2">10</div>
              <div class="text-sm">Capítulos Concluídos</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-3xl font-bold mb-2">25+</div>
              <div class="text-sm">Quizzes Respondidos</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-3xl font-bold mb-2">49</div>
              <div class="text-sm">Tarefas Práticas</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-3xl font-bold mb-2">15h+</div>
              <div class="text-sm">Tempo de Estudo</div>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">📚 Conhecimentos Adquiridos</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-gray-800 mb-3">Fundamentos Sólidos:</h4>
              <ul class="text-sm text-gray-700 space-y-2">
                <li>✅ Estratégias de marketing digital</li>
                <li>✅ Tráfego pago em múltiplas plataformas</li>
                <li>✅ Análise de casos de sucesso reais</li>
                <li>✅ Ferramentas essenciais do mercado</li>
                <li>✅ Otimização e escalabilidade</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 mb-3">Conhecimentos Avançados:</h4>
              <ul class="text-sm text-gray-700 space-y-2">
                <li>✅ Automação e Inteligência Artificial</li>
                <li>✅ Attribution Modeling avançado</li>
                <li>✅ Growth Hacking e estratégias disruptivas</li>
                <li>✅ Marketing de performance global</li>
                <li>✅ Expansão internacional</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎓 Certificações Recomendadas</h3>
          <div class="space-y-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Certificações Gratuitas (Comece por aqui)</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h5 class="font-medium mb-1">Google</h5>
                  <ul class="text-sm space-y-1">
                    <li>• Google Ads Search Certification</li>
                    <li>• Google Analytics Individual Qualification</li>
                    <li>• Google Ads Display Certification</li>
                    <li>• YouTube Ads Certification</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium mb-1">Meta & Outros</h5>
                  <ul class="text-sm space-y-1">
                    <li>• Meta Certified Digital Marketing Associate</li>
                    <li>• HubSpot Content Marketing</li>
                    <li>• LinkedIn Marketing Solutions</li>
                    <li>• Microsoft Advertising Certification</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Certificações Premium (Próximo nível)</h4>
              <ul class="text-sm space-y-1">
                <li>• Google Marketing Platform (Analytics 360, DV360)</li>
                <li>• Facebook Blueprint Advanced Certifications</li>
                <li>• Amazon DSP Certification</li>
                <li>• Salesforce Marketing Cloud</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">🚀 Plano de Ação: Próximos 90 Dias</h3>
          <div class="space-y-4">
            <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 class="font-semibold text-green-800 mb-2">Dias 1-30: Implementação Básica</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Aplicar conhecimentos em projeto real</li>
                <li>• Configurar ferramentas essenciais (GA4, GTM)</li>
                <li>• Criar primeira campanha otimizada</li>
                <li>• Obter 2-3 certificações gratuitas</li>
              </ul>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 class="font-semibold text-blue-800 mb-2">Dias 31-60: Otimização Avançada</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Implementar automação e IA</li>
                <li>• Configurar attribution modeling</li>
                <li>• Executar primeiros growth experiments</li>
                <li>• Criar dashboards avançados</li>
              </ul>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 class="font-semibold text-purple-800 mb-2">Dias 61-90: Escalabilidade</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Escalar campanhas vencedoras</li>
                <li>• Expandir para novos canais</li>
                <li>• Implementar estratégias globais</li>
                <li>• Mentorar outros profissionais</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">💼 Oportunidades de Carreira</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Posições Técnicas</h4>
              <ul class="text-sm space-y-1">
                <li>• Performance Marketing Manager</li>
                <li>• Growth Marketing Specialist</li>
                <li>• Digital Marketing Analyst</li>
                <li>• Marketing Automation Specialist</li>
                <li>• Conversion Rate Optimization Expert</li>
              </ul>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Posições Estratégicas</h4>
              <ul class="text-sm space-y-1">
                <li>• Head of Growth</li>
                <li>• Digital Marketing Director</li>
                <li>• VP of Marketing</li>
                <li>• Chief Marketing Officer (CMO)</li>
                <li>• Marketing Consultant</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">📈 Faixas Salariais (Brasil - 2024)</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="font-medium text-gray-800">Analista de Marketing Digital</span>
              <span class="text-green-600 font-bold">R$ 3.500 - R$ 7.000</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="font-medium text-gray-800">Especialista em Performance</span>
              <span class="text-green-600 font-bold">R$ 6.000 - R$ 12.000</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="font-medium text-gray-800">Growth Marketing Manager</span>
              <span class="text-green-600 font-bold">R$ 8.000 - R$ 18.000</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="font-medium text-gray-800">Head of Growth</span>
              <span class="text-green-600 font-bold">R$ 15.000 - R$ 35.000</span>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-900 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">🎯 Sua Jornada Continua</h3>
          <p class="text-lg mb-4">O marketing digital evolui constantemente. Mantenha-se atualizado, continue experimentando e nunca pare de aprender.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-2xl mb-2">📚</div>
              <div class="font-semibold">Continue Estudando</div>
              <div class="text-sm opacity-80">Novos cursos e certificações</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-2xl mb-2">🚀</div>
              <div class="font-semibold">Aplique na Prática</div>
              <div class="text-sm opacity-80">Projetos reais e experimentos</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg text-center">
              <div class="text-2xl mb-2">🤝</div>
              <div class="font-semibold">Compartilhe Conhecimento</div>
              <div class="text-sm opacity-80">Ensine e aprenda com outros</div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-lg text-center">
          <h3 class="text-2xl font-bold mb-4">🏆 PARABÉNS!</h3>
          <p class="text-lg mb-4">Você completou com sucesso o curso mais completo de Marketing Digital e Tráfego Pago!</p>
          
          <div class="bg-white/20 p-4 rounded-lg inline-block">
            <div class="text-3xl font-bold mb-2">CERTIFICADO DE CONCLUSÃO</div>
            <div class="text-lg">Marketing Digital & Tráfego Pago</div>
            <div class="text-sm opacity-90 mt-2">Curso Completo - 10 Capítulos - 15+ Horas</div>
          </div>
        </div>
      </div>
    `,
    quiz: {
      questions: [
        {
          question: "Qual é o próximo passo mais importante após concluir este curso?",
          options: ["Fazer outro curso", "Aplicar conhecimentos em projeto real", "Tirar férias", "Mudar de carreira"],
          correct: 1,
          explanation: "O mais importante é aplicar os conhecimentos adquiridos em um projeto real para consolidar o aprendizado e ganhar experiência prática.",
          difficulty: 'easy' as const
        },
        {
          question: "Quantas certificações gratuitas você deveria obter nos primeiros 30 dias?",
          options: ["1", "2-3", "5+", "Nenhuma"],
          correct: 1,
          explanation: "Recomenda-se obter 2-3 certificações gratuitas (Google Ads, Analytics, Meta) para validar conhecimentos e melhorar o currículo.",
          difficulty: 'easy' as const
        },
        {
          question: "Qual é a faixa salarial de um Growth Marketing Manager no Brasil?",
          options: ["R$ 3.500 - R$ 7.000", "R$ 6.000 - R$ 12.000", "R$ 8.000 - R$ 18.000", "R$ 15.000 - R$ 35.000"],
          correct: 2,
          explanation: "Growth Marketing Manager no Brasil ganha entre R$ 8.000 - R$ 18.000, dependendo da experiência e tamanho da empresa.",
          difficulty: 'medium' as const
        }
      ]
    },
    checklist: [
      { id: 50, text: "Definir projeto real para aplicar conhecimentos", completed: false, priority: 'high' as const },
      { id: 51, text: "Obter certificação Google Ads Search", completed: false, priority: 'high' as const },
      { id: 52, text: "Obter certificação Google Analytics", completed: false, priority: 'high' as const },
      { id: 53, text: "Criar perfil LinkedIn otimizado", completed: false, priority: 'medium' as const },
      { id: 54, text: "Participar de comunidade de marketing", completed: false, priority: 'medium' as const },
      { id: 55, text: "Planejar próximos 90 dias de carreira", completed: false, priority: 'high' as const }
    ]
  }
]

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Iniciante': return 'bg-green-100 text-green-800'
    case 'Intermediário': return 'bg-blue-100 text-blue-800'
    case 'Avançado': return 'bg-purple-100 text-purple-800'
    case 'Expert': return 'bg-red-100 text-red-800'
    case 'Conclusão': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high': return 'border-red-300 bg-red-50'
    case 'medium': return 'border-yellow-300 bg-yellow-50'
    case 'low': return 'border-green-300 bg-green-50'
  }
}

const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'hard': return 'bg-red-100 text-red-800'
  }
}

export default function EBookInterativo() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // CRITICAL FIX: Inicializa o progresso com um valor padrão seguro
  const [progress, setProgress] = useState<UserProgress>({
    currentChapter: 1,
    completedQuizzes: [],
    completedChecklists: [],
    bookmarks: [],
    readingTime: 0,
    certificates: [],
    studyStreak: 0,
    lastStudyDate: ''
  })
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({})
  const [showQuizResults, setShowQuizResults] = useState<{[key: string]: boolean}>({})
  // CRITICAL FIX: Inicializa a checklist com um valor padrão vazio (será populado no useEffect)
  const [checklists, setChecklists] = useState<{[key: number]: ChecklistItem[]}>(() => {
    const initialChecklists: {[key: number]: ChecklistItem[]} = {}
    chapters.forEach(chapter => {
      initialChecklists[chapter.id] = chapter.checklist
    })
    return initialChecklists
  })

  // CRITICAL FIX: Carregamento do localStorage dentro do useEffect (client-side only)
  useEffect(() => {
    const savedProgress = localStorage.getItem('ebook-progress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }

    const savedChecklists = localStorage.getItem('ebook-checklists')
    if (savedChecklists) {
      setChecklists(JSON.parse(savedChecklists))
    }
  }, [])

  // Salvar progresso no localStorage
  useEffect(() => {
    localStorage.setItem('ebook-progress', JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem('ebook-checklists', JSON.stringify(checklists))
  }, [checklists])

  const currentChapterData = chapters.find(c => c.id === currentChapter)!

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const key = `${currentChapter}-${questionIndex}`
    setQuizAnswers(prev => ({ ...prev, [key]: answerIndex }))
    setShowQuizResults(prev => ({ ...prev, [key]: true }))

    // Marcar quiz como completo se todas as perguntas foram respondidas
    const allAnswered = currentChapterData.quiz.questions.every((_, idx) => 
      quizAnswers[`${currentChapter}-${idx}`] !== undefined || idx === questionIndex
    )

    if (allAnswered && !progress.completedQuizzes.includes(currentChapter)) {
      setProgress(prev => ({
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, currentChapter]
      }))
    }
  }

  const toggleChecklistItem = (itemId: number) => {
    const newChecklists = {
      ...checklists,
      [currentChapter]: checklists[currentChapter].map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    };
    setChecklists(newChecklists);

    // Atualizar progresso
    const updatedItems = newChecklists[currentChapter];
    const completedCount = updatedItems.filter(item => item.completed).length
    
    if (completedCount === updatedItems.length && !progress.completedChecklists.includes(currentChapter)) {
      setProgress(prev => ({
        ...prev,
        completedChecklists: [...prev.completedChecklists, currentChapter]
      }))
    }
  }

  const nextChapter = () => {
    if (currentChapter < chapters.length) {
      const newChapter = currentChapter + 1
      setCurrentChapter(newChapter)
      setProgress(prev => ({
        ...prev,
        currentChapter: Math.max(prev.currentChapter, newChapter)
      }))
    }
  }

  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  const toggleBookmark = () => {
    setProgress(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(currentChapter)
        ? prev.bookmarks.filter(id => id !== currentChapter)
        : [...prev.bookmarks, currentChapter]
    }))
  }

  const progressPercentage = ((progress.completedQuizzes.length + progress.completedChecklists.length) / (chapters.length * 2)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Marketing Digital Pro</h1>
                  <p className="text-sm text-gray-600">Guia Completo + Estratégias Avançadas</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-md transition-colors ${
                  progress.bookmarks.includes(currentChapter)
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'text-gray-500 hover:text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              
              <div className="hidden sm:flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Capítulo {currentChapter} de {chapters.length}
                </span>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b lg:hidden">
              <h2 className="text-lg font-semibold text-gray-900">Índice</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      setCurrentChapter(chapter.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentChapter === chapter.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentChapter === chapter.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {chapter.id}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{chapter.title}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            currentChapter === chapter.id
                              ? 'bg-white/20 text-white'
                              : getLevelColor(chapter.level)
                          }`}>
                            {chapter.level}
                          </span>
                          <span className={`text-xs ${
                            currentChapter === chapter.id ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {chapter.estimatedTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {progress.completedQuizzes.includes(chapter.id) && (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          )}
                          {progress.completedChecklists.includes(chapter.id) && (
                            <Award className="w-3 h-3 text-yellow-400" />
                          )}
                          {progress.bookmarks.includes(chapter.id) && (
                            <Bookmark className="w-3 h-3 text-yellow-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Conteúdo Principal */}
        <main className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Conteúdo do Capítulo */}
            <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8 mb-8">
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <span>Capítulo {currentChapter}</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(currentChapterData.level)}`}>
                    {currentChapterData.level}
                  </span>
                  <span>•</span>
                  <span>{currentChapterData.estimatedTime} de leitura</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentChapterData.title}
                </h1>
              </div>
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: currentChapterData.content }}
              />
            </div>

            {/* Quiz Interativo */}
            <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Quiz do Capítulo</h2>
                {progress.completedQuizzes.includes(currentChapter) && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completo
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {currentChapterData.quiz.questions.map((question, qIndex) => (
                  <div key={qIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {qIndex + 1}. {question.question}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                            quizAnswers[`${currentChapter}-${qIndex}`] === oIndex
                              ? oIndex === question.correct
                                ? 'bg-green-50 border-green-300 text-green-800'
                                : 'bg-red-50 border-red-300 text-red-800'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {showQuizResults[`${currentChapter}-${qIndex}`] && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Explicação:</h4>
                        <p className="text-blue-800 text-sm">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist Prático */}
            <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Checklist de Ação</h2>
                {progress.completedChecklists.includes(currentChapter) && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completo
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {checklists[currentChapter]?.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      item.completed
                        ? 'bg-green-50 border-green-200'
                        : `${getPriorityColor(item.priority)} hover:bg-opacity-75`
                    }`}
                  >
                    <button
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        item.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {item.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </button>
                    <span className={`flex-1 ${item.completed ? 'text-green-800 line-through' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.priority === 'high' ? 'bg-red-100 text-red-700' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Dica:</strong> Complete todos os itens do checklist antes de avançar para o próximo capítulo para maximizar seu aprendizado.
                </p>
              </div>
            </div>

            {/* Navegação */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevChapter}
                disabled={currentChapter === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentChapter === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Anterior</span>
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Progresso do Capítulo</div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${progress.completedQuizzes.includes(currentChapter) ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-500">Quiz</span>
                  <div className={`w-3 h-3 rounded-full ${progress.completedChecklists.includes(currentChapter) ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-500">Checklist</span>
                </div>
              </div>

              <button
                onClick={nextChapter}
                disabled={currentChapter === chapters.length}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentChapter === chapters.length
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md'
                }`}
              >
                <span>Próximo</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Recursos Complementares */}
            <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold mb-4">📚 Recursos Complementares</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Video className="w-5 h-5 mr-2" />
                    Vídeos Recomendados
                  </h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Google Ads para Iniciantes (YouTube)</li>
                    <li>• Facebook Ads Masterclass</li>
                    <li>• Casos de Sucesso em Tráfego Pago</li>
                    <li>• Growth Hacking na Prática</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Artigos Essenciais
                  </h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Guia Completo de Google Analytics 4</li>
                    <li>• Como Criar Landing Pages que Convertem</li>
                    <li>• Métricas que Realmente Importam</li>
                    <li>• Attribution Modeling Avançado</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Baixe o Kit Completo</h3>
                    <p className="text-sm opacity-90">Templates, planilhas, checklists e certificados para aplicar na prática</p>
                  </div>
                </div>

              </div>

              {/* Estatísticas de Progresso */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{progress.completedQuizzes.length}</div>
                  <div className="text-sm opacity-80">Quizzes Completos</div>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{progress.completedChecklists.length}</div>
                  <div className="text-sm opacity-80">Checklists Completos</div>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400">{progress.bookmarks.length}</div>
                  <div className="text-sm opacity-80">Capítulos Salvos</div>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm opacity-80">Progresso Total</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}