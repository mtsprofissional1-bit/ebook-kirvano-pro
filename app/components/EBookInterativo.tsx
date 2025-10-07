'use client'

import { useState, useEffect, useMemo } from 'react'
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
  Video,
  FileText,
  ExternalLink,
  Bookmark,
  Target,
  Brain
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

// Definições de Capítulo (Resumo) --------------------------------------------

const chapters = [
  { id: 1, title: "Fundamentos do Marketing Digital", level: "Iniciante", estimatedTime: "15 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Introdução ao Marketing Digital</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">O marketing digital revolucionou a forma como as empresas se conectam com seus clientes. Diferente do marketing tradicional, ele oferece precisão, mensuração e personalização em escala global.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Principais Canais Digitais:</h3>
      <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>SEO:</strong> Otimização para mecanismos de busca</li>
        <li><strong>SEM:</strong> Marketing em mecanismos de busca</li>
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
        <div class="bg-white p-4 rounded-lg shadow-sm border"><h5 class="font-semibold text-gray-800 mb-2">Alcance e Impressões</h5><p class="text-sm text-gray-600">Quantas pessoas viram seu conteúdo</p></div>
        <div class="bg-white p-4 rounded-lg shadow-sm border"><h5 class="font-semibold text-gray-800 mb-2">Engajamento</h5><p class="text-sm text-gray-600">Interações com seu conteúdo</p></div>
        <div class="bg-white p-4 rounded-lg shadow-sm border"><h5 class="font-semibold text-gray-800 mb-2">Conversão</h5><p class="text-sm text-gray-600">Ações desejadas realizadas</p></div>
        <div class="bg-white p-4 rounded-lg shadow-sm border"><h5 class="font-semibold text-gray-800 mb-2">ROI</h5><p class="text-sm text-gray-600">Retorno sobre investimento</p></div>
      </div>
    `, quiz: { questions: [{ question: "Qual é a principal vantagem do marketing digital sobre o tradicional?", options: ["Menor custo", "Maior alcance", "Mensuração precisa", "Todas as anteriores"], correct: 3, explanation: "O marketing digital oferece menor custo, maior alcance e mensuração precisa, combinando todas essas vantagens.", difficulty: 'easy' as const }, { question: "O que significa ROI no marketing digital?", options: ["Return on Investment", "Rate of Interest", "Reach of Influence", "Revenue of Internet"], correct: 0, explanation: "ROI significa Return on Investment (Retorno sobre Investimento), uma métrica crucial para avaliar a eficácia das campanhas.", difficulty: 'easy' as const }] }, checklist: [{ id: 1, text: "Definir objetivos SMART para sua estratégia digital", completed: false, priority: 'high' as const }, { id: 2, text: "Identificar seu público-alvo e criar personas", completed: false, priority: 'high' as const }, { id: 3, text: "Escolher os canais digitais mais adequados", completed: false, priority: 'medium' as const }, { id: 4, text: "Configurar ferramentas de análise (Google Analytics)", completed: false, priority: 'high' as const }, { id: 5, text: "Estabelecer KPIs para cada canal", completed: false, priority: 'medium' as const }]
  },
  {
    id: 2, title: "Estratégias de Tráfego Pago", level: "Iniciante", estimatedTime: "20 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Dominando o Tráfego Pago</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">O tráfego pago é uma das formas mais eficazes de gerar resultados rápidos no marketing digital. Com investimento direcionado, você pode alcançar seu público ideal no momento certo.</p>
      
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Principais Plataformas:</h3>
      
      <div class="space-y-4 mb-6">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg"><h4 class="font-bold mb-2">🔍 Google Ads</h4><p class="text-sm">Capture usuários com intenção de compra através de palavras-chave estratégicas.</p></div>
        <div class="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-4 rounded-lg"><h4 class="font-bold mb-2">📱 Meta Ads (Facebook/Instagram)</h4><p class="text-sm">Segmentação avançada baseada em interesses e comportamentos.</p></div>
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg"><h4 class="font-bold mb-2">🎥 YouTube Ads</h4><p class="text-sm">Engajamento através de conteúdo visual e storytelling.</p></div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Estrutura de Campanha Vencedora:</h3>
      <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg mb-4"><ol class="list-decimal pl-6 space-y-2 text-gray-700"><li><strong>Pesquisa de Palavras-chave:</strong> Use ferramentas como Google Keyword Planner</li><li><strong>Segmentação Precisa:</strong> Defina demografia, interesses e comportamentos</li><li><strong>Criativos Impactantes:</strong> Imagens/vídeos que chamem atenção</li><li><strong>Landing Pages Otimizadas:</strong> Páginas focadas na conversão</li><li><strong>Testes A/B:</strong> Compare diferentes versões dos anúncios</li><li><strong>Otimização Contínua:</strong> Ajuste baseado nos dados</li></ol></div>
      
    `, quiz: { questions: [{ question: "Qual é a principal vantagem do Google Ads?", options: ["Baixo custo", "Captura intenção de compra", "Fácil configuração", "Alcance global"], correct: 1, explanation: "O Google Ads captura usuários no momento exato em que estão buscando por produtos ou serviços, demonstrando alta intenção de compra.", difficulty: 'medium' as const }, { question: "O que são testes A/B em tráfego pago?", options: ["Testar duas plataformas", "Comparar diferentes versões de anúncios", "Testar horários", "Comparar públicos"], correct: 1, explanation: "Testes A/B comparam diferentes versões de anúncios para identificar qual performa melhor, otimizando os resultados.", difficulty: 'medium' as const }] }, checklist: [{ id: 6, text: "Definir orçamento diário e total da campanha", completed: false, priority: 'high' as const }, { id: 7, text: "Pesquisar e selecionar palavras-chave relevantes", completed: false, priority: 'high' as const }, { id: 8, text: "Criar pelo menos 3 variações de anúncios", completed: false, priority: 'medium' as const }, { id: 9, text: "Configurar conversões e pixels de rastreamento", completed: false, priority: 'high' as const }, { id: 10, text: "Preparar landing pages otimizadas", completed: false, priority: 'high' as const }]
  },
  {
    id: 3, title: "Casos de Sucesso e Exemplos Práticos", level: "Intermediário", estimatedTime: "25 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Casos de Sucesso Reais</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Aprenda com campanhas que geraram resultados extraordinários e descubra as estratégias por trás do sucesso.</p>
      
      <div class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"><div class="flex items-center mb-4"><div class="bg-green-100 p-2 rounded-full mr-3"><Award class="w-5 h-5 text-green-600" /></div><h3 class="text-xl font-bold text-gray-800">E-commerce de Moda - ROI 400%</h3></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"><div><h4 class="font-semibold text-gray-700 mb-2">Desafio:</h4><p class="text-sm text-gray-600">Loja online com baixas vendas e alto custo de aquisição de clientes.</p></div><div><h4 class="font-semibold text-gray-700 mb-2">Solução:</h4><p class="text-sm text-gray-600">Campanhas segmentadas no Facebook Ads com remarketing inteligente.</p></div></div></div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"><div class="flex items-center mb-4"><div class="bg-blue-100 p-2 rounded-full mr-3"><Users class="w-5 h-5 text-blue-600" /></div><h3 class="text-xl font-bold text-gray-800">SaaS B2B - 300% Aumento em Leads</h3></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"><div><h4 class="font-semibold text-gray-700 mb-2">Desafio:</h4><p class="text-sm text-gray-600">Software B2B precisava gerar mais leads qualificados para o time de vendas.</p></div><div><h4 class="font-semibold text-gray-700 mb-2">Solução:</h4><p class="text-sm text-gray-600">Estratégia integrada Google Ads + LinkedIn Ads + Marketing de Conteúdo.</p></div></div></div>
        
      </div>
    `, quiz: { questions: [{ question: "Qual foi o principal fator de sucesso no caso do e-commerce de moda?", options: ["Preços baixos", "Remarketing inteligente", "Muitos produtos", "Entrega rápida"], correct: 1, explanation: "O remarketing inteligente foi crucial, permitindo reconquistar visitantes que não compraram na primeira visita.", difficulty: 'medium' as const }, { question: "No caso B2B, qual plataforma foi mais eficaz para gerar leads qualificados?", options: ["Facebook", "Google Ads", "LinkedIn", "Todas igualmente"], correct: 3, explanation: "A estratégia integrada usando Google Ads, LinkedIn e marketing de conteúdo foi o que gerou os melhores resultados.", difficulty: 'hard' as const }] }, checklist: [{ id: 11, text: "Analisar casos de sucesso do seu nicho", completed: false, priority: 'medium' as const }, { id: 12, text: "Identificar táticas aplicáveis ao seu negócio", completed: false, priority: 'high' as const }, { id: 13, text: "Implementar pixel de rastreamento", completed: false, priority: 'high' as const }, { id: 14, text: "Configurar campanhas de remarketing", completed: false, priority: 'high' as const }, { id: 15, text: "Criar lookalike audiences", completed: false, priority: 'medium' as const }]
  },
  { id: 4, title: "Ferramentas e Recursos Essenciais", level: "Intermediário", estimatedTime: "18 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Arsenal de Ferramentas do Profissional</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Conheça as ferramentas indispensáveis para criar, gerenciar e otimizar suas campanhas de marketing digital com máxima eficiência.</p>
      
      <div class="space-y-6"><div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">📊 Análise e Métricas</h3></div><div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🎯 Gestão de Campanhas</h3></div><div class="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🔍 Pesquisa e Planejamento</h3></div><div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-xl font-bold text-gray-800 mb-4">🎨 Criação de Conteúdo</h3></div></div>
    `, quiz: { questions: [{ question: "Qual ferramenta é essencial para análise de comportamento dos usuários no site?", options: ["Google Ads", "Google Analytics", "Facebook Ads", "Canva"], correct: 1, explanation: "Google Analytics é a ferramenta fundamental para entender como os usuários interagem com seu site e campanhas.", difficulty: 'easy' as const }, { question: "Para pesquisa de palavras-chave gratuita, qual ferramenta do Google usar?", options: ["Google Analytics", "Google Search Console", "Google Keyword Planner", "Google Ads Editor"], correct: 2, explanation: "Google Keyword Planner é a ferramenta gratuita do Google para pesquisa de palavras-chave e planejamento de campanhas.", difficulty: 'medium' as const }] }, checklist: [{ id: 16, text: "Configurar Google Analytics 4 no seu site", completed: false, priority: 'high' as const }, { id: 17, text: "Instalar Google Search Console", completed: false, priority: 'high' as const }, { id: 18, text: "Criar conta no Google Keyword Planner", completed: false, priority: 'medium' as const }, { id: 19, text: "Configurar Facebook Business Manager", completed: false, priority: 'high' as const }, { id: 20, text: "Escolher ferramenta de design (Canva/Figma)", completed: false, priority: 'low' as const }]
  },
  { id: 5, title: "Otimização e Escalabilidade", level: "Intermediário", estimatedTime: "22 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Escalando Seus Resultados</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Aprenda como otimizar suas campanhas para máxima performance e escalar seus resultados de forma sustentável e lucrativa.</p>
      
      <div class="space-y-6"><div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🚀 Estratégias de Otimização</h3></div><div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-xl font-bold text-gray-800 mb-4">📊 Métricas de Performance Avançadas</h3></div><div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">📈 Estratégias de Escalabilidade</h3></div><div class="bg-yellow-50 border border-yellow-200 p-6 rounded-lg"><h3 class="text-xl font-bold text-gray-800 mb-4">⚠️ Armadilhas da Escalabilidade</h3></div></div>
    `, quiz: { questions: [{ question: "Qual é a proporção ideal entre LTV e CAC?", options: ["1:1", "2:1", "3:1 ou mais", "Não importa"], correct: 2, explanation: "A proporção ideal é LTV:CAC de 3:1 ou mais, preferencialmente 5:1, garantindo sustentabilidade e lucratividade.", difficulty: 'hard' as const }, { question: "Qual é o aumento máximo recomendado ao escalar uma campanha?", options: ["10%", "30%", "50%", "100%"], correct: 1, explanation: "O aumento recomendado é de 20-30% por vez para evitar instabilidade e perda de performance da campanha.", difficulty: 'medium' as const }] }, checklist: [{ id: 21, text: "Calcular LTV e CAC dos seus clientes", completed: false, priority: 'high' as const }, { id: 22, text: "Definir ROAS mínimo aceitável", completed: false, priority: 'high' as const }, { id: 23, text: "Criar sistema de monitoramento diário", completed: false, priority: 'medium' as const }, { id: 24, text: "Preparar criativos para testes A/B", completed: false, priority: 'medium' as const }, { id: 25, text: "Estabelecer processo de escalabilidade gradual", completed: false, priority: 'high' as const }]
  },
  { id: 6, title: "Automação e Inteligência Artificial", level: "Avançado", estimatedTime: "30 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">O Futuro do Marketing Digital: IA e Automação</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Descubra como a inteligência artificial e automação estão revolucionando o marketing digital, permitindo campanhas mais eficientes, personalizadas e escaláveis.</p>
      
      <div class="space-y-6"><div class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🤖 Automação de Campanhas</h3></div><div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-xl font-bold text-gray-800 mb-4">🧠 IA para Personalização</h3></div><div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">⚡ Ferramentas de Automação Avançada</h3></div></div>
    `, quiz: { questions: [{ question: "Qual é a principal vantagem do Smart Bidding no Google Ads?", options: ["Menor custo", "Otimização automática baseada em dados", "Mais controle manual", "Interface mais simples"], correct: 1, explanation: "Smart Bidding usa machine learning para otimizar lances automaticamente baseado em sinais de conversão em tempo real.", difficulty: 'hard' as const }, { question: "O que é Dynamic Creative Optimization (DCO)?", options: ["Otimização de orçamento", "Criação automática de anúncios personalizados", "Análise de concorrentes", "Gestão de campanhas"], correct: 1, explanation: "DCO cria automaticamente anúncios personalizados em tempo real, combinando diferentes elementos criativos baseado no perfil do usuário.", difficulty: 'hard' as const }, { question: "Qual ferramenta é mais adequada para automação de e-commerce?", options: ["HubSpot", "Klaviyo", "Marketo", "ActiveCampaign"], correct: 1, explanation: "Klaviyo é especializada em automação para e-commerce, com recursos específicos para abandoned cart, product recommendations e customer lifecycle.", difficulty: 'medium' as const }] }, checklist: [{ id: 26, text: "Configurar Smart Bidding em campanhas Google Ads", completed: false, priority: 'high' as const }, { id: 27, text: "Ativar Advantage+ Shopping no Facebook", completed: false, priority: 'high' as const }, { id: 28, text: "Implementar Dynamic Creative Optimization", completed: false, priority: 'medium' as const }, { id: 29, text: "Configurar automação de email marketing", completed: false, priority: 'high' as const }, { id: 30, text: "Testar ferramentas de IA para criação de conteúdo", completed: false, priority: 'low' as const }, { id: 31, text: "Implementar chatbot inteligente no site", completed: false, priority: 'medium' as const }]
  },
  { id: 7, title: "Attribution Modeling e Analytics Avançado", level: "Avançado", estimatedTime: "35 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Medindo o Que Realmente Importa</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Domine os modelos de atribuição avançados e analytics para entender verdadeiramente o impacto de cada touchpoint na jornada do cliente.</p>
      <div class="space-y-6"><div class="bg-gradient-to-r from-slate-600 to-gray-700 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">📊 Modelos de Atribuição</h3></div><div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-xl font-bold text-gray-800 mb-4">🔍 Cross-Channel Attribution</h3></div><div class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🎯 Advanced Analytics Setup</h3></div></div>
    `, quiz: { questions: [{ question: "Qual modelo de atribuição é mais preciso para campanhas multi-touch?", options: ["Last-Click", "First-Click", "Data-Driven", "Linear"], correct: 2, explanation: "Data-Driven Attribution usa machine learning para analisar todos os touchpoints e determinar a contribuição real de cada um para a conversão.", difficulty: 'hard' as const }, { question: "O que é Marketing Mix Modeling (MMM)?", options: ["Modelo de atribuição", "Análise estatística de impacto dos canais", "Ferramenta de automação", "Plataforma de dados"], correct: 1, explanation: "MMM é uma análise estatística que quantifica o impacto incremental de diferentes canais de marketing nas vendas, considerando fatores externos.", difficulty: 'hard' as const }, { question: "Qual é a principal vantagem do server-side tracking?", options: ["Mais barato", "Mais preciso e privacy-compliant", "Mais fácil de implementar", "Mais rápido"], correct: 1, explanation: "Server-side tracking é mais preciso pois não depende de cookies do browser e é mais compatível com regulamentações de privacidade.", difficulty: 'medium' as const }] }, checklist: [{ id: 32, text: "Implementar Google Tag Manager Server-Side", completed: false, priority: 'high' as const }, { id: 33, text: "Configurar Facebook Conversions API", completed: false, priority: 'high' as const }, { id: 34, text: "Ativar Data-Driven Attribution no Google Ads", completed: false, priority: 'medium' as const }, { id: 35, text: "Criar dashboard cross-channel no Data Studio", completed: false, priority: 'medium' as const }, { id: 36, text: "Planejar primeiro incrementality test", completed: false, priority: 'high' as const }, { id: 37, text: "Coletar dados históricos para MMM", completed: false, priority: 'low' as const }]
  },
  { id: 8, title: "Growth Hacking e Estratégias Disruptivas", level: "Avançado", estimatedTime: "28 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Crescimento Exponencial com Growth Hacking</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Descubra as estratégias não-convencionais que startups unicórnio usaram para crescer rapidamente, e como aplicar growth hacking no seu negócio.</p>
      
      <div class="space-y-6"><div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🚀 Fundamentos do Growth Hacking</h3></div><div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-xl font-bold text-gray-800 mb-4">💡 Táticas de Growth Hacking Comprovadas</h3></div><div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🎯 Growth Experiments Framework</h3></div></div>
    `, quiz: { questions: [{ question: "O que significa o 'K' no viral coefficient?", options: ["Número de usuários", "Invites × conversion rate", "Custo por usuário", "Tempo de retenção"], correct: 1, explanation: "Viral coefficient (K) = número de convites enviados × taxa de conversão dos convites. K > 1 significa crescimento viral.", difficulty: 'hard' as const }, { question: "Qual é o framework mais usado para growth hacking?", options: ["SMART", "AARRR", "OKR", "KPI"], correct: 1, explanation: "AARRR (Acquisition, Activation, Retention, Revenue, Referral) é o framework clássico para growth hacking, cobrindo todo o funil.", difficulty: 'medium' as const }, { question: "O que é Product-Market Fit segundo Sean Ellis?", options: ["Produto perfeito", ">40% usuários 'muito decepcionados' sem produto", "ROI positivo", "Crescimento de 100%"], correct: 1, explanation: "Sean Ellis definiu PMF como >40% dos usuários respondendo que ficariam 'muito decepcionados' se não pudessem mais usar o produto.", difficulty: 'hard' as const }] }, checklist: [{ id: 38, text: "Mapear customer journey completo", completed: false, priority: 'high' as const }, { id: 39, text: "Definir North Star Metric do negócio", completed: false, priority: 'high' as const }, { id: 40, text: "Implementar analytics de produto (Amplitude/Mixpanel)", completed: false, priority: 'medium' as const }, { id: 41, text: "Criar backlog de 50+ experimentos", completed: false, priority: 'medium' as const }, { id: 42, text: "Aplicar ICE scoring nos experimentos", completed: false, priority: 'high' as const }, { id: 43, text: "Executar primeiro experimento viral", completed: false, priority: 'high' as const }]
  },
  { id: 9, title: "Marketing de Performance Global", level: "Expert", estimatedTime: "40 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Expansão Internacional e Performance Global</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Domine as estratégias para escalar campanhas globalmente, navegando por diferentes culturas, moedas, regulamentações e comportamentos de consumo.</p>
      
      <div class="space-y-6"><div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🌍 Estratégia de Expansão Global</h3></div><div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-xl font-bold text-gray-800 mb-4">🎯 Platform Strategy por Região</h3></div><div class="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">💰 Global Pricing & Currency Strategy</h3></div></div>
    `, quiz: { questions: [{ question: "Qual é o principal desafio do marketing global em 2024?", options: ["Idiomas diferentes", "Privacy regulations & cookie deprecation", "Fusos horários", "Moedas diferentes"], correct: 1, explanation: "Privacy regulations como GDPR e a deprecação de cookies third-party são os maiores desafios para tracking e targeting global.", difficulty: 'hard' as const }, { question: "O que é Purchasing Power Parity (PPP) no contexto de pricing global?", options: ["Taxa de câmbio", "Ajuste de preços baseado no poder de compra local", "Imposto internacional", "Custo de envio"], correct: 1, explanation: "PPP ajusta preços baseado no poder de compra local, permitindo que produtos sejam acessíveis em diferentes economias.", difficulty: 'medium' as const }, { question: "Qual plataforma domina o marketing digital na China?", options: ["Google Ads", "Facebook Ads", "WeChat Ads", "LinkedIn Ads"], correct: 2, explanation: "WeChat Ads domina na China com 1.3B usuários ativos, já que Google e Facebook são bloqueados no país.", difficulty: 'medium' as const }] }, checklist: [{ id: 44, text: "Realizar pesquisa de mercado para 3 países-alvo", completed: false, priority: 'high' as const }, { id: 45, text: "Mapear regulamentações de privacidade por região", completed: false, priority: 'high' as const }, { id: 46, text: "Definir estratégia de pricing com PPP", completed: false, priority: 'medium' as const }, { id: 47, text: "Criar framework de localização cultural", completed: false, priority: 'high' as const }, { id: 48, text: "Implementar tracking multi-currency", completed: false, priority: 'medium' as const }, { id: 49, text: "Estabelecer parcerias locais estratégicas", completed: false, priority: 'low' as const }]
  },
  { id: 10, title: "Certificação e Próximos Passos", level: "Conclusão", estimatedTime: "15 min", content: `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Parabéns! Você Dominou o Marketing Digital</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">Chegou ao final desta jornada completa de aprendizado. Agora é hora de aplicar todo conhecimento adquirido e continuar evoluindo como profissional de marketing digital.</p>
      
      <div class="space-y-6"><div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🏆 Seu Progresso Completo</h3></div><div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-xl font-bold text-gray-800 mb-4">📚 Conhecimentos Adquiridos</h3></div><div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg"><h3 class="text-xl font-bold mb-4">🎓 Certificações Recomendadas</h3></div></div>
    `, quiz: { questions: [{ question: "Qual é o próximo passo mais importante após concluir este curso?", options: ["Fazer outro curso", "Aplicar conhecimentos em projeto real", "Tirar férias", "Mudar de carreira"], correct: 1, explanation: "O mais importante é aplicar os conhecimentos adquiridos em um projeto real para consolidar o aprendizado e ganhar experiência prática.", difficulty: 'easy' as const }, { question: "Quantas certificações gratuitas você deveria obter nos primeiros 30 dias?", options: ["1", "2-3", "5+", "Nenhuma"], correct: 1, explanation: "Recomenda-se obter 2-3 certificações gratuitas (Google Ads, Analytics, Meta) para validar conhecimentos e melhorar o currículo.", difficulty: 'easy' as const }, { question: "Qual é a faixa salarial de um Growth Marketing Manager no Brasil?", options: ["R$ 3.500 - R$ 7.000", "R$ 6.000 - R$ 12.000", "R$ 8.000 - R$ 18.000", "R$ 15.000 - R$ 35.000"], correct: 2, explanation: "Growth Marketing Manager no Brasil ganha entre R$ 8.000 - R$ 18.000, dependendo da experiência e tamanho da empresa.", difficulty: 'medium' as const }] }, checklist: [{ id: 50, text: "Definir projeto real para aplicar conhecimentos", completed: false, priority: 'high' as const }, { id: 51, text: "Obter certificação Google Ads Search", completed: false, priority: 'high' as const }, { id: 52, text: "Obter certificação Google Analytics", completed: false, priority: 'high' as const }, { id: 53, text: "Criar perfil LinkedIn otimizado", completed: false, priority: 'medium' as const }, { id: 54, text: "Participar de comunidade de marketing", completed: false, priority: 'medium' as const }, { id: 55, text: "Planejar próximos 90 dias de carreira", completed: false, priority: 'high' as const }]
  }
]

// Funções de Estilo
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

// O Componente Principal
export default function EBookInterativo() {
  // Configurações de Segurança e Estado
  const SENHA_SECRETA = 'MASTER10X'; 
  const AUTH_KEY = 'kirvano_masterclass_auth'; 

  // ESTADOS (EXISTENTES E NOVOS)
  const [currentChapter, setCurrentChapter] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Estados de Segurança
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados do Progresso (Iniciados com valores default, preenchidos em useEffect)
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
  const [checklists, setChecklists] = useState<{[key: number]: ChecklistItem[]}>(() => {
    const initialChecklists: {[key: number]: ChecklistItem[]} = {}
    chapters.forEach(chapter => {
      initialChecklists[chapter.id] = chapter.checklist
    })
    return initialChecklists
  })

  // 1. CRITICAL FIX & AUTENTICAÇÃO: Carregar Progresso e Checar Segurança (Client-Side Only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Checa a autenticação
      const isAuth = localStorage.getItem(AUTH_KEY) === 'true';
      setIsAuthenticated(isAuth);

      // Carrega o progresso (só se estiver no navegador)
      const savedProgress = localStorage.getItem('ebook-progress')
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }

      const savedChecklists = localStorage.getItem('ebook-checklists')
      if (savedChecklists) {
        setChecklists(JSON.parse(savedChecklists))
      }
    }
    setLoading(false);
  }, [])

  // 2. Função de Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword.toUpperCase() === SENHA_SECRETA) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY, 'true'); // Salva o acesso
      }
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta. Verifique se digitou a senha de acesso (MASTER10X) que você recebeu após a compra.');
      setInputPassword('');
    }
  };

  // 3. Salvar Progresso (useEffect original mantido)
  useEffect(() => {
    if (isAuthenticated) {
        localStorage.setItem('ebook-progress', JSON.stringify(progress))
    }
  }, [progress, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
        localStorage.setItem('ebook-checklists', JSON.stringify(checklists))
    }
  }, [checklists, isAuthenticated])

  // Lógica de Conteúdo
  const currentChapterData = useMemo(() => chapters.find(c => c.id === currentChapter)!, [currentChapter]);

  // Funções de Navegação e Quiz
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const key = `${currentChapter}-${questionIndex}`
    setQuizAnswers(prev => ({ ...prev, [key]: answerIndex }))
    setShowQuizResults(prev => ({ ...prev, [key]: true }))

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

  // 4. PORTÃO DE ACESSO (Renderização Condicional)
  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#1E293B', fontSize: '24px' }}>Carregando Masterclass...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#1E293B', 
        color: 'white', 
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1 style={{ color: '#FCD34D', fontSize: '32px', marginBottom: '10px' }}>MASTERCLASS TRÁFEGO PRO</h1>
        <p style={{ marginBottom: '30px', maxWidth: '400px' }}>
            <span style={{fontWeight: 'bold'}}>ACESSO EXCLUSIVO:</span> Por favor, insira a senha que você recebeu após a compra para liberar seu conteúdo de 10 Módulos.
        </p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Digite a Senha (MASTER10X)"
            required
            style={{ 
                padding: '12px', 
                borderRadius: '5px', 
                border: '1px solid #475569', 
                width: '280px', 
                textAlign: 'center',
                fontSize: '16px',
                color: '#1E293B'
            }}
          />
          <button type="submit" style={{ 
            padding: '12px', 
            borderRadius: '5px', 
            border: 'none', 
            backgroundColor: '#059669', 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}>
            Acessar Masterclass
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#94A3B8' }}>
            Senha de Teste: MASTER10X
        </p>
      </div>
    );
  }

  // 5. RENDERIZAÇÃO PRINCIPAL (Se Autenticado)
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