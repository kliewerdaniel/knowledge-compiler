import { motion } from "framer-motion";

interface StatCard {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

interface StatisticsCardsProps {
  cards: StatCard[];
  loading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function StatisticsCards({ cards, loading = false }: StatisticsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="skeleton w-8 h-8 rounded-lg" />
            </div>
            <div className="skeleton w-16 h-8 mb-2" />
            <div className="skeleton w-24 h-3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card, index) => (
        <motion.div key={index} variants={itemVariants}>
          <div className="card h-full">
            <div className="flex items-center justify-between mb-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <div style={{ color: card.color }}>{card.icon}</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              {card.label}
            </div>
            {card.subtitle && (
              <div className="text-xs text-[var(--text-muted)] mt-1">
                {card.subtitle}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
