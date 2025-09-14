import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

interface TicketStats {
  total: number;
  open: number;
  closed: number;
  pending: number;
}

interface PerformanceMetrics {
  avgResolutionTime: number;
  customerSatisfaction: number;
  firstResponseTime: number;
  agentProductivity: number;
}

interface RecentActivity {
  id: number;
  message: string;
  time: string;
  type: 'resolved' | 'created' | 'updated' | 'assigned';
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  selectedTimeRange = 'month';

  ticketStats: TicketStats = {
    total: 0,
    open: 0,
    closed: 0,
    pending: 0
  };

  performanceMetrics: PerformanceMetrics = {
    avgResolutionTime: 0,
    customerSatisfaction: 0,
    firstResponseTime: 0,
    agentProductivity: 0
  };

  recentActivities: RecentActivity[] = [];

  // Chart instances
  private ticketTrendsChart: Chart | null = null;
  private statusPieChart: Chart | null = null;
  private priorityChart: Chart | null = null;
  private resolutionTimeChart: Chart | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    // Delay chart initialization to ensure DOM is ready
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  loadDashboardData(): void {
    // Load hardcoded data - replace with actual API calls
    this.ticketStats = this.getTicketStats();
    this.performanceMetrics = this.getPerformanceMetrics();
    this.recentActivities = this.getRecentActivities();
  }

  private getTicketStats(): TicketStats {
    // Hardcoded data - replace with actual API call
    return {
      total: 150,
      open: 50,
      closed: 100,
      pending: 25
    };
  }

  private getPerformanceMetrics(): PerformanceMetrics {
    // Hardcoded data - replace with actual API call
    return {
      avgResolutionTime: 24.5,
      customerSatisfaction: 94.2,
      firstResponseTime: 15,
      agentProductivity: 12.3
    };
  }

  private getRecentActivities(): RecentActivity[] {
    // Hardcoded data - replace with actual API call
    return [
      {
        id: 1,
        message: 'Ticket #123 has been resolved by Support Team',
        time: '2 minutes ago',
        type: 'resolved',
        priority: 'high'
      },
      {
        id: 2,
        message: 'User John Doe has opened a new ticket',
        time: '15 minutes ago',
        type: 'created',
        priority: 'medium'
      },
      {
        id: 3,
        message: 'Ticket #124 is being reviewed by support',
        time: '1 hour ago',
        type: 'updated',
        priority: 'low'
      },
      {
        id: 4,
        message: 'Ticket #125 assigned to Agent Sarah',
        time: '2 hours ago',
        type: 'assigned',
        priority: 'medium'
      },
      {
        id: 5,
        message: 'Critical ticket #126 requires immediate attention',
        time: '3 hours ago',
        type: 'created',
        priority: 'high'
      }
    ];
  }

  private initializeCharts(): void {
    this.createTicketTrendsChart();
    this.createStatusPieChart();
    this.createPriorityChart();
    this.createResolutionTimeChart();
  }

  private createTicketTrendsChart(): void {
    const ctx = document.getElementById('ticketTrendsChart') as HTMLCanvasElement;
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Created',
            data: [65, 59, 80, 81, 56, 55, 40, 65, 75, 85, 70, 60],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Resolved',
            data: [45, 49, 60, 71, 46, 45, 30, 55, 65, 75, 60, 50],
            borderColor: '#4facfe',
            backgroundColor: 'rgba(79, 172, 254, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          x: {
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          }
        }
      }
    };

    this.ticketTrendsChart = new Chart(ctx, config);
  }

  private createStatusPieChart(): void {
    const ctx = document.getElementById('statusPieChart') as HTMLCanvasElement;
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Open', 'Closed', 'Pending', 'In Progress'],
        datasets: [{
          data: [50, 100, 25, 30],
          backgroundColor: [
            '#f093fb',
            '#4facfe',
            '#ffecd2',
            '#667eea'
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    };

    this.statusPieChart = new Chart(ctx, config);
  }

  private createPriorityChart(): void {
    const ctx = document.getElementById('priorityChart') as HTMLCanvasElement;
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
          label: 'Tickets by Priority',
          data: [30, 75, 45],
          backgroundColor: [
            'rgba(220, 53, 69, 0.8)',
            'rgba(255, 193, 7, 0.8)',
            'rgba(40, 167, 69, 0.8)'
          ],
          borderColor: [
            '#dc3545',
            '#ffc107',
            '#28a745'
          ],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    };

    this.priorityChart = new Chart(ctx, config);
  }

  private createResolutionTimeChart(): void {
    const ctx = document.getElementById('resolutionTimeChart') as HTMLCanvasElement;
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'radar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Resolution Time (hours)',
          data: [20, 18, 25, 22, 19, 12, 15],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.2)',
          pointBackgroundColor: '#667eea',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 30,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            pointLabels: {
              font: {
                size: 12
              }
            }
          }
        }
      }
    };

    this.resolutionTimeChart = new Chart(ctx, config);
  }

  // Event handlers
  refreshData(): void {
    this.loadDashboardData();
    this.initializeCharts();
  }
onTimeRangeChange() {
    console.log('Time range changed to:', this.selectedTimeRange);
    this.loadDashboardData();
  }
  toggleSidebar(): void {
    // Emit event to parent component to toggle sidebar
    // or implement sidebar toggle logic
  }
  toggleUserMenu(): void {
    // Toggle user menu visibility
  }
  logout(): void {
    // Call the logout function from AuthService
    // Redirect to login page after logout
  }
  createNewTicket(): void {
    console.log('Creating a new ticket...');
    // Navigate to create ticket page or open modal
    // this.router.navigate(['/tickets/create']);
  }

  assignTickets(): void {
    console.log('Assigning tickets...');
    // Open assign tickets modal or navigate to assign page
  }

  generateReport(): void {
    console.log('Generating report...');
    // Call backend report generation or navigate to reports page
  }

  openSettings(): void {
    console.log('Opening settings...');
    // Navigate to settings page
    // this.router.navigate(['/settings']);
  }

  viewAllActivities(): void {
  console.log('Navigating to full activity log...');
  // For example: Navigate to activities page if routing is set up
  // this.router.navigate(['/activities']);
}

getActivityIcon(type: string): string {
  switch (type) {
    case 'resolved':
      return '✅';
    case 'created':
      return '🆕';
    case 'updated':
      return '🔄';
    case 'assigned':
      return '👥';
    default:
      return 'ℹ️';
  }
}

 

}