
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { ArrowRight, Brain, Newspaper, Settings } from 'lucide-react';

const AlternateFrontPage = () => {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-news-dark/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=2874&auto=format&fit=crop" 
          alt="News background" 
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Stay Informed, <span className="text-news-accent">Effortlessly</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl">
                NewsNest delivers personalized news with AI-powered summaries and sentiment analysis, saving you time while keeping you informed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                  className="bg-news-accent hover:bg-news-accent/90 text-white px-8"
                >
                  {isAuthenticated ? 'My Dashboard' : 'Get Started'} 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {!isAuthenticated && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="text-white border-white hover:bg-white/10"
                  >
                    Log In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-news-dark">How NewsNest Works</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform transforms how you consume news
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-muted/30 p-6 rounded-xl border border-border flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-news-accent/10 flex items-center justify-center mb-4">
                <Newspaper className="h-8 w-8 text-news-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Sources</h3>
              <p className="text-muted-foreground">
                We aggregate news from trusted sources based on your preferences, so you never miss important stories.
              </p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-xl border border-border flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-news-accent/10 flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-news-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Summaries</h3>
              <p className="text-muted-foreground">
                Advanced AI condenses lengthy articles into concise summaries, saving you time while preserving key information.
              </p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-xl border border-border flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-news-accent/10 flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-news-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalization</h3>
              <p className="text-muted-foreground">
                Customize your news feed with topics, keywords, and sources that matter most to you for a tailored experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-news-dark">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-news-accent/20 rounded-full flex items-center justify-center text-news-accent font-bold">JS</div>
                <div className="ml-4">
                  <h4 className="font-semibold">James Smith</h4>
                  <p className="text-sm text-muted-foreground">Marketing Director</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "NewsNest has changed how I stay informed. The AI summaries are accurate and save me so much time each morning."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-news-accent/20 rounded-full flex items-center justify-center text-news-accent font-bold">AT</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Amy Thompson</h4>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "The sentiment analysis helps me understand bias in reporting. It's like having a personal news analyst working for me."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-news-accent/20 rounded-full flex items-center justify-center text-news-accent font-bold">RJ</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">University Professor</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "I recommend NewsNest to all my students. It's an excellent tool for media literacy and understanding current events efficiently."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-news-dark text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-3">Ready to transform your news experience?</h2>
              <p className="text-white/80 max-w-xl">
                Join thousands of users who are saving time and staying better informed with NewsNest.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
              className="bg-news-accent hover:bg-news-accent/90 text-white px-8 self-start"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AlternateFrontPage;
