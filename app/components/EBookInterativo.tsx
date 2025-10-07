'use client'

import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Users, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  Clock, 
  Download,
  Circle,
  Play,
  ExternalLink
} from 'lucide-react'

interface UserProgress {
  currentChapter: number
  completedQuizzes: number[]
  completedChecklists: number[]
  bookmarks: number[]
  readingTime: number
}

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface ChecklistItem {
  id: number
  text: string
  completed: boolean
}

const chapters = [
  {
    id: 1,
    title: "Fundamentos do Marketing Digital",
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
          explanation: "O marketing digital oferece menor custo, maior alcance e mensuração precisa, combinando todas essas vantagens."
        },
        {
          question: "O que significa ROI no marketing digital?",
          options: ["Return on Investment", "Rate of Interest", "Reach of Influence", "Revenue of Internet"],
          correct: 0,
          explanation: "ROI significa Return on Investment (Retorno sobre Investimento), uma métrica crucial para avaliar a eficácia das campanhas."
        }
      ]
    },
    checklist: [
      { id: 1, text: "Definir objetivos SMART para sua estratégia digital", completed: false },
      { id: 2, text: "Identificar seu público-alvo e criar personas", completed: false },
      { id: 3, text: "Escolher os canais digitais mais adequados", completed: false },
      { id: 4, text: "Configurar ferramentas de análise (Google Analytics)", completed: false },
      { id: 5, text: "Estabelecer KPIs para cada canal", completed: false }
    ]
  },
  {
    id: 2,
    title: "Estratégias de Tráfego Pago",
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
          explanation: "O Google Ads captura usuários no momento exato em que estão buscando por produtos ou serviços, demonstrando alta intenção de compra."
        },
        {
          question: "O que são testes A/B em tráfego pago?",
          options: ["Testar duas plataformas", "Comparar diferentes versões de anúncios", "Testar horários", "Comparar públicos"],
          correct: 1,
          explanation: "Testes A/B comparam diferentes versões de anúncios para identificar qual performa melhor, otimizando os resultados."
        }
      ]
    },
    checklist: [
      { id: 6, text: "Definir orçamento diário e total da campanha", completed: false },
      { id: 7, text: "Pesquisar e selecionar palavras-chave relevantes", completed: false },
      { id: 8, text: "Criar pelo menos 3 variações de anúncios", completed: false },
      { id: 9, text: "Configurar conversões e pixels de rastreamento", completed: false },
      { id: 10, text: "Preparar landing pages otimizadas", completed: false }
    ]
  },
  {
    id: 3,
    title: "Casos de Sucesso e Exemplos Práticos",
    content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Casos de Sucesso Reais</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Aprenda com campanhas que geraram resultados extraordinários e descubra as estratégias por trás do sucesso.</p>
      
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center mb-4">
            <div class="bg-green-100 p-2 rounded-full mr-3">
              <Star className="w-5 h-5 text-green-600" />
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
              <Users className="w-5 h-5 text-blue-600" />
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
          explanation: "O remarketing inteligente foi crucial, permitindo reconquistar visitantes que não compraram na primeira visita."
        },
        {
          question: "No caso B2B, qual plataforma foi mais eficaz para gerar leads qualificados?",
          options: ["Facebook", "Google Ads", "LinkedIn", "Todas igualmente"],
          correct: 3,
          explanation: "A estratégia integrada usando Google Ads, LinkedIn e marketing de conteúdo foi o que gerou os melhores resultados."
        }
      ]
    },
    checklist: [
      { id: 11, text: "Analisar casos de sucesso do seu nicho", completed: false },
      { id: 12, text: "Identificar táticas aplicáveis ao seu negócio", completed: false },
      { id: 13, text: "Implementar pixel de rastreamento", completed: false },
      { id: 14, text: "Configurar campanhas de remarketing", completed: false },
      { id: 15, text: "Criar lookalike audiences", completed: false }
    ]
  },
  {
    id: 4,
    title: "Ferramentas e Recursos Essenciais",
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
                <Play className="w-6 h-6 text-red-600" />
              </div>
              <h4 class="font-semibold text-gray-800">Canva Pro</h4>
              <p class="text-sm text-gray-600">Design gráfico simplificado</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Circle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 class="font-semibold text-gray-800">Figma</h4>
              <p class="text-sm text-gray-600">Design colaborativo</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Download className="w-6 h-6 text-green-600" />
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
              <ExternalLink className="w-5 h-5 text-orange-600" />
              <div>
                <h4 class="font-semibold text-gray-800">Google Skillshop</h4>
                <p class="text-sm text-gray-600">Certificações gratuitas Google Ads e Analytics</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <ExternalLink className="w-5 h-5 text-orange-600" />
              <div>
                <h4 class="font-semibold text-gray-800">Facebook Blueprint</h4>
                <p class="text-sm text-gray-600">Cursos oficiais de marketing no Facebook e Instagram</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <ExternalLink className="w-5 h-5 text-orange-600" />
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
          explanation: "Google Analytics é a ferramenta fundamental para entender como os usuários interagem com seu site e campanhas."
        },
        {
          question: "Para pesquisa de palavras-chave gratuita, qual ferramenta do Google usar?",
          options: ["Google Analytics", "Google Search Console", "Google Keyword Planner", "Google Ads Editor"],
          correct: 2,
          explanation: "Google Keyword Planner é a ferramenta gratuita do Google para pesquisa de palavras-chave e planejamento de campanhas."
        }
      ]
    },
    checklist: [
      { id: 16, text: "Configurar Google Analytics 4 no seu site", completed: false },
      { id: 17, text: "Instalar Google Search Console", completed: false },
      { id: 18, text: "Criar conta no Google Keyword Planner", completed: false },
      { id: 19, text: "Configurar Facebook Business Manager", completed: false },
      { id: 20, text: "Escolher ferramenta de design (Canva/Figma)", completed: false }
    ]
  },
  {
    id: 5,
    title: "Otimização e Escalabilidade",
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
              <h4 class="font-semibent text-green-600 mb-2">✅ Melhores Práticas:</h4>
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
          explanation: "A proporção ideal é LTV:CAC de 3:1 ou mais, preferencialmente 5:1, garantindo sustentabilidade e lucratividade."
        },
        {
          question: "Qual é o aumento máximo recomendado ao escalar uma campanha?",
          options: ["10%", "30%", "50%", "100%"],
          correct: 1,
          explanation: "O aumento recomendado é de 20-30% por vez para evitar instabilidade e perda de performance da campanha."
        }
      ]
    },
    checklist: [
      { id: 21, text: "Calcular LTV e CAC dos seus clientes", completed: false },
      { id: 22, text: "Definir ROAS mínimo aceitável", completed: false },
      { id: 23, text: "Criar sistema de monitoramento diário", completed: false },
      { id: 24, text: "Preparar criativos para testes A/B", completed: false },
      { id: 25, text: "Estabelecer processo de escalabilidade gradual", completed: false }
    ]
  }
]

export default function EBookInterativo() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [progress, setProgress] = useState<UserProgress>({
    currentChapter: 1,
    completedQuizzes: [],
    completedChecklists: [],
    bookmarks: [],
    readingTime: 0
  })
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({})
  const [showQuizResults, setShowQuizResults] = useState<{[key: string]: boolean}>({})
  const [checklists, setChecklists] = useState<{[key: number]: ChecklistItem[]}>({})

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('ebook-progress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }

    const savedChecklists = localStorage.getItem('ebook-checklists')
    if (savedChecklists) {
      setChecklists(JSON.parse(savedChecklists))
    } else {
      // Inicializar checklists
      const initialChecklists: {[key: number]: ChecklistItem[]} = {}
      chapters.forEach(chapter => {
        initialChecklists[chapter.id] = chapter.checklist
      })
      setChecklists(initialChecklists)
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
    setChecklists(prev => ({
      ...prev,
      [currentChapter]: prev[currentChapter].map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    }))

    // Atualizar progresso
    const updatedItems = checklists[currentChapter].map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    )
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
                  <Circle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Marketing Digital Pro</h1>
                  <p className="text-sm text-gray-600">Guia Completo de Tráfego Pago</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
                          {progress.completedQuizzes.includes(chapter.id) && (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          )}
                          {progress.completedChecklists.includes(chapter.id) && (
                            <Star className="w-3 h-3 text-yellow-400" />
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
                  <span>~15 min de leitura</span>
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
                  <CheckCircle className="w-6 h-6 text-white" />
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
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {qIndex + 1}. {question.question}
                    </h3>
                    
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
                        <h4 className="font-semibold text-blue-900 mb-2">Explicação:</h4>
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
                  <Star className="w-6 h-6 text-white" />
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
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
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
                  <h3 className="font-semibold mb-2">🎥 Vídeos Recomendados</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Google Ads para Iniciantes (YouTube)</li>
                    <li>• Facebook Ads Masterclass</li>
                    <li>• Casos de Sucesso em Tráfego Pago</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">📖 Artigos Essenciais</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Guia Completo de Google Analytics</li>
                    <li>• Como Criar Landing Pages que Convertem</li>
                    <li>• Métricas que Realmente Importam</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Baixe o Kit Completo</h3>
                    <p className="text-sm opacity-90">Templates, planilhas e checklists para aplicar na prática</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}