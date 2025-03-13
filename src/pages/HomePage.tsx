
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const HomePage = () => {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-news-dark">
                Your News, Simplified and Smarter
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                NewsNest uses AI to deliver personalized news summaries, sentiment analysis, and insights on the topics that matter to you.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button 
                  size="lg" 
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                  className="bg-news-accent hover:bg-news-accent/90"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                </Button>
                {!isAuthenticated && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                  >
                    Log In
                  </Button>
                )}
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1170&auto=format&fit=crop"
              width={550}
              height={400}
              alt="News illustration"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Why Choose NewsNest?
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl">
              Smart features designed to keep you informed without the information overload.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-news-accent"
                >
                  <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI-Powered Summaries</h3>
              <p className="text-muted-foreground">
                Get concise, accurate summaries of news articles, saving you time while keeping you informed.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-news-accent"
                >
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Sentiment Analysis</h3>
              <p className="text-muted-foreground">
                Understand the tone of news articles with our sentiment indicators, helping you gauge content bias.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-news-accent"
                >
                  <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Personalized Feed</h3>
              <p className="text-muted-foreground">
                Customize your news sources, topics, and keywords to create a feed that's tailored to your interests.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;
