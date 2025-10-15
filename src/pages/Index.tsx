import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Building {
  id: string;
  name: string;
  level: number;
  type: string;
  position: { x: number; y: number };
  icon: string;
}

interface Cookie {
  id: string;
  name: string;
  rarity: string;
  power: number;
  owned: boolean;
  icon: string;
}

interface PlayerStats {
  gold: number;
  gems: number;
  level: number;
  experience: number;
  maxExperience: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('kingdom');
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    gold: 5000,
    gems: 150,
    level: 5,
    experience: 350,
    maxExperience: 500
  });

  const [buildings, setBuildings] = useState<Building[]>([
    { id: '1', name: 'Замок', level: 3, type: 'castle', position: { x: 50, y: 40 }, icon: '🏰' },
    { id: '2', name: 'Пекарня', level: 2, type: 'bakery', position: { x: 20, y: 60 }, icon: '🍪' },
    { id: '3', name: 'Ферма', level: 1, type: 'farm', position: { x: 75, y: 65 }, icon: '🌾' }
  ]);

  const [cookies, setCookies] = useState<Cookie[]>([
    { id: '1', name: 'Храбрец', rarity: 'epic', power: 450, owned: true, icon: '🍪' },
    { id: '2', name: 'Клубничка', rarity: 'rare', power: 320, owned: true, icon: '🍓' },
    { id: '3', name: 'Волшебник', rarity: 'legendary', power: 680, owned: false, icon: '🔮' },
    { id: '4', name: 'Рыцарь', rarity: 'epic', power: 520, owned: false, icon: '⚔️' }
  ]);

  const shopItems = [
    { id: '1', name: 'Золотой пакет', cost: 50, type: 'gems', reward: '10000 золота', icon: '💰' },
    { id: '2', name: 'Набор строителя', cost: 100, type: 'gems', reward: 'Ускорение постройки', icon: '🔨' },
    { id: '3', name: 'Печенька-сюрприз', cost: 300, type: 'gems', reward: 'Случайная печенька', icon: '🎁' }
  ];

  const upgradeBuilding = (buildingId: string) => {
    if (playerStats.gold >= 1000) {
      setBuildings(prev => prev.map(b => 
        b.id === buildingId ? { ...b, level: b.level + 1 } : b
      ));
      setPlayerStats(prev => ({ ...prev, gold: prev.gold - 1000 }));
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'epic': return 'bg-gradient-to-r from-purple-400 to-blue-400';
      case 'rare': return 'bg-gradient-to-r from-blue-400 to-cyan-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="cookie-gradient p-4 text-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🍪</div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide">Cookie Kingdom</h1>
                <p className="text-sm opacity-90">Уровень {playerStats.level}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Badge className="bg-yellow-500 text-white px-3 py-2 text-base">
                <Icon name="Coins" size={18} className="mr-1" />
                {playerStats.gold}
              </Badge>
              <Badge className="bg-pink-500 text-white px-3 py-2 text-base">
                <Icon name="Gem" size={18} className="mr-1" />
                {playerStats.gems}
              </Badge>
            </div>
          </div>
          <Progress value={(playerStats.experience / playerStats.maxExperience) * 100} className="h-2 bg-white/30" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/80 backdrop-blur">
            <TabsTrigger value="kingdom" className="data-[state=active]:cookie-gradient data-[state=active]:text-white">
              <Icon name="Castle" size={20} />
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:cookie-gradient data-[state=active]:text-white">
              <Icon name="ShoppingBag" size={20} />
            </TabsTrigger>
            <TabsTrigger value="cookies" className="data-[state=active]:cookie-gradient data-[state=active]:text-white">
              <Icon name="Users" size={20} />
            </TabsTrigger>
            <TabsTrigger value="game" className="data-[state=active]:cookie-gradient data-[state=active]:text-white">
              <Icon name="Gamepad2" size={20} />
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:cookie-gradient data-[state=active]:text-white">
              <Icon name="User" size={20} />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kingdom" className="animate-fade-in">
            <Card className="kingdom-bg p-8 min-h-[500px] relative overflow-hidden border-4 border-yellow-400">
              <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
                Твоё Королевство 👑
              </h2>
              <div className="relative h-[400px]">
                {buildings.map((building) => (
                  <div
                    key={building.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                    style={{ left: `${building.position.x}%`, top: `${building.position.y}%` }}
                    onClick={() => upgradeBuilding(building.id)}
                  >
                    <Card className="p-4 bg-white/95 backdrop-blur shadow-xl border-2 border-yellow-300 hover:shadow-2xl transition-shadow">
                      <div className="text-4xl mb-2 text-center">{building.icon}</div>
                      <p className="font-bold text-center text-sm">{building.name}</p>
                      <Badge className="building-gradient w-full justify-center mt-2">
                        Ур. {building.level}
                      </Badge>
                      <Button size="sm" className="w-full mt-2 cookie-gradient text-white border-0">
                        <Icon name="ArrowUp" size={14} className="mr-1" />
                        Улучшить
                      </Button>
                    </Card>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center">Магазин 🏪</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shopItems.map((item) => (
                <Card key={item.id} className="p-6 hover:shadow-xl transition-shadow bg-white/90 backdrop-blur">
                  <div className="text-5xl text-center mb-4">{item.icon}</div>
                  <h3 className="font-bold text-xl mb-2 text-center">{item.name}</h3>
                  <p className="text-gray-600 text-center mb-4">{item.reward}</p>
                  <Button className="w-full cookie-gradient text-white border-0">
                    <Icon name="Gem" size={18} className="mr-2" />
                    {item.cost} кристаллов
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cookies" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center">Персонажи 🍪</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cookies.map((cookie) => (
                <Card key={cookie.id} className={`p-6 border-4 ${cookie.owned ? 'bg-white/90' : 'bg-gray-200/70'} backdrop-blur`}>
                  <div className={`${getRarityColor(cookie.rarity)} rounded-full w-20 h-20 flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg`}>
                    {cookie.icon}
                  </div>
                  <h3 className="font-bold text-xl text-center mb-2">{cookie.name}</h3>
                  <Badge className={`${getRarityColor(cookie.rarity)} w-full justify-center mb-3 text-white`}>
                    {cookie.rarity.toUpperCase()}
                  </Badge>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Icon name="Zap" size={16} className="text-yellow-500" />
                    <span className="font-bold">{cookie.power}</span>
                  </div>
                  <Button 
                    className={`w-full ${cookie.owned ? 'bg-green-500 hover:bg-green-600' : 'cookie-gradient'} text-white border-0`}
                    disabled={cookie.owned}
                  >
                    {cookie.owned ? (
                      <>
                        <Icon name="Check" size={18} className="mr-2" />
                        В коллекции
                      </>
                    ) : (
                      <>
                        <Icon name="Lock" size={18} className="mr-2" />
                        Получить
                      </>
                    )}
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="game" className="animate-fade-in">
            <Card className="p-8 bg-white/90 backdrop-blur">
              <h2 className="text-3xl font-bold mb-6 text-center">Приключения 🎮</h2>
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-2xl font-bold mb-4">Карта приключений</p>
                <p className="text-gray-600 mb-6">Отправляйся в захватывающие приключения с твоими печеньками!</p>
                <Button size="lg" className="cookie-gradient text-white border-0 text-lg px-8">
                  <Icon name="Play" size={24} className="mr-2" />
                  Начать приключение
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="p-8 bg-white/90 backdrop-blur">
              <div className="text-center mb-8">
                <div className="w-32 h-32 cookie-gradient rounded-full mx-auto mb-4 flex items-center justify-center text-6xl shadow-xl">
                  👤
                </div>
                <h2 className="text-3xl font-bold mb-2">Мастер Печенек</h2>
                <Badge className="building-gradient text-white text-lg px-4 py-2">
                  Уровень {playerStats.level}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-200">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">💰</div>
                    <div>
                      <p className="text-gray-600 text-sm">Золото</p>
                      <p className="text-3xl font-bold">{playerStats.gold}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-pink-100 to-pink-200">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">💎</div>
                    <div>
                      <p className="text-gray-600 text-sm">Кристаллы</p>
                      <p className="text-3xl font-bold">{playerStats.gems}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Опыт до следующего уровня</span>
                    <span className="text-gray-600">{playerStats.experience}/{playerStats.maxExperience}</span>
                  </div>
                  <Progress value={(playerStats.experience / playerStats.maxExperience) * 100} className="h-3" />
                </div>
                
                <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">Собрано печенек</p>
                      <p className="text-2xl font-bold">{cookies.filter(c => c.owned).length}/{cookies.length}</p>
                    </div>
                    <div className="text-4xl">🍪</div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;