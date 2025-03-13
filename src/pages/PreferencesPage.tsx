
import { PageLayout } from '@/components/layout/PageLayout';
import { PreferencesForm } from '@/components/preferences/PreferencesForm';

const PreferencesPage = () => {
  return (
    <PageLayout>
      <div className="container py-6 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">News Preferences</h1>
          <p className="text-muted-foreground mt-1">
            Customize your news feed to focus on what matters to you
          </p>
        </div>
        <PreferencesForm />
      </div>
    </PageLayout>
  );
};

export default PreferencesPage;
