import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Quote } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type QuoteCardProps = {
  quote: string;
  author?: string;
  source?: string;
};

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author, source }) => {
  return (
    <View style={styles.container}>
      <View style={styles.quoteIconContainer}>
        <Quote size={24} color={colors.primary} />
      </View>
      <Text style={styles.quoteText}>{quote}</Text>
      {(author || source) && (
        <View style={styles.footer}>
          {author && <Text style={styles.author}>— {author}</Text>}
          {source && <Text style={styles.source}>{source}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  quoteIconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  source: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default QuoteCard;
