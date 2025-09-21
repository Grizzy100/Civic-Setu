import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const reports = [
  {
    id: 1,
    title: "Pothole on Linking Road",
    description: "Large pothole causing traffic jam. Needs urgent repair before monsoon.",
    reporter: "Priya Sharma",
    timeAgo: "2 days ago",
    status: "in-progress" as const,
    priority: "high" as const,
    likes: 25,
    comments: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Gl_3shz82lqMwgAUNXUXRyGDHNXjZryXeSHAgz2xAOt3SlfH6RlAIKfqwcg0Q9UaENidm1acQQr0AkFrYJZaxISuBEFk_FIs8TXIO5OJWi4Nkm9CGiPrIRF3hG1UnhZqIWi1JBAZg_gOUM7yqIgfweyC455h5fNSS7cak8LtSxTnbAUfdu_nYmh5oYQUeffKD74MaYtJO60Qpdk5zwlrN-qJMw221e7u3ms19XbN-pegVKT9LnPhqGn12F81LRRXE-kDNtorMKg",
  },
  {
    id: 2,
    title: "Broken Swing in Park",
    description: "Swing set in Shivaji Park is broken. Unsafe for children.",
    reporter: "Rahul Gupta",
    timeAgo: "3 days ago",
    status: "resolved" as const,
    priority: "medium" as const,
    likes: 18,
    comments: 8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB76ORmOo0-gAtiwUFGy0d63PUN4vrTHTI9BbqHe9q0y26J3WzTfkNf4FSr5uoCU9sQUjBwMtpeFVrB_T5U2xeEd7eqkD5l-NdgcMeCy-bVlMfKYrYbgk3akrzOZ0NgRaQ1WjZ1d_ejG5BxcfCsSZXEA6yJ1AO4VJsIqku6NNGrQipCzMrvB0LM2VCYGrNoWQfOWmelwUpO2WqsVrJKTzDb3RQBbdU6tWkHW3J5smbIi-QJsEcGxQs00yjicTY1Wa1TeFjIMBHZZAU",
  },
  {
    id: 3,
    title: "Streetlight Not Working",
    description: "Streetlight at the corner of Nehru Road is out. It is a safety risk at night.",
    reporter: "Anjali Mehta",
    timeAgo: "5 days ago",
    status: "open" as const,
    priority: "high" as const,
    likes: 32,
    comments: 15,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4iHSTFvGhSytlIUtQ5punAtCskwuwgZ42I00dSggNqi-hrrPWhpJNkvMhOJgo5JiEsIMNM3H5nHC_6v_S6JxDOa5ZAh9bhzBt2i7qBauWsMZ4Q4SL92wKFQ-qag9CZSbxJ5TrcKFk4xfRnGcphsw3NSTHNIyyeSZFGrFcFwi93m0lNXfdNu6MR6fW-ksQjC4ScFyevsdcocx7tpfspc5CLNjC2rHBpo4ukkKUACU-I4xpqGU0VfgkJOA7Qb9Lsls1yhS6md08TY",
  },
];

const filterButtons = [
  { name: "All Issues", active: true },
  { name: "Roads", active: false },
  { name: "Water Supply", active: false },
  { name: "Street Lights", active: false },
  { name: "Waste Management", active: false },
  { name: "Public Safety", active: false },
];

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="px-4 md:px-10 lg:px-20 xl:px-40 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-text-primary">Admin Reports Feed</h2>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="w-8 h-8 bg-background-alt rounded-full flex items-center justify-center">
                  <span className="text-sm">✨</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
              <Input
                placeholder="Street light issues in Mumbai"
                className="pl-10"
              />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {filterButtons.map((filter) => (
                <Button
                  key={filter.name}
                  variant={filter.active ? "default" : "secondary"}
                  size="sm"
                  className="rounded-full"
                >
                  {filter.name}
                </Button>
              ))}
            </div>
          </header>

          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-background-alt rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div
                    className="md:col-span-1 bg-center bg-no-repeat bg-cover min-h-48"
                    style={{ backgroundImage: `url("${report.image}")` }}
                  />
                  <div className="md:col-span-2 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-text-primary">{report.title}</h3>
                        <StatusBadge status={report.status} priority={report.priority} />
                      </div>
                      <p className="text-text-secondary mb-3">{report.description}</p>
                      <p className="text-sm text-text-muted">Reported by {report.reporter} · {report.timeAgo}</p>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                      <button className="flex items-center gap-2 text-text-secondary hover:text-brand-orange transition-colors">
                        <span className="material-symbols-outlined">thumb_up</span>
                        <span className="font-medium">{report.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-text-secondary hover:text-brand-orange transition-colors">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <span className="font-medium">{report.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav className="mt-8 flex justify-center items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <span className="material-symbols-outlined">chevron_left</span>
            </Button>
            <Button variant="default" size="icon" className="h-10 w-10">1</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">2</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">3</Button>
            <span className="flex h-10 w-10 items-center justify-center text-text-secondary">...</span>
            <Button variant="ghost" size="icon" className="h-10 w-10">10</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <span className="material-symbols-outlined">chevron_right</span>
            </Button>
          </nav>
        </div>
      </div>
    </DashboardLayout>
  );
}