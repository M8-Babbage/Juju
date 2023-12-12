export interface Sidebar {
  title: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  id: number;
  icon: string;
  title: string;
  url: string;
  status: boolean;
}

const sidebarData: Sidebar[] = [
  {
    title: 'Menu',
    items: [
      {
        id: 0,
        icon: 'characters',
        title: 'Personajes',
        url: '/characters?page=1',
        status: true
      },
      {
        id: 1,
        icon: 'characters',
        title: 'Ubicaciones',
        url: '/locations',
        status: false
      },
      {
        id: 1,
        icon: 'characters',
        title: 'Episodios',
        url: '/episodes',
        status: false
      }
    ]
  },
  {
    title: 'Social',
    items: [
      {
        id: 0,
        icon: 'github',
        title: 'Github',
        url: 'https://github.com/M8-Babbage',
        status: true
      }
    ]
  }
];

export { sidebarData };
