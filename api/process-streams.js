import { LanguageServiceClient } from '@google-cloud/language';

// Inicializar cliente de Google Cloud Natural Language
const client = new LanguageServiceClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { streams } = req.body;

    if (!streams || !Array.isArray(streams)) {
      return res.status(400).json({ error: 'Streams array required' });
    }

    // Procesar cada stream
    const processedStreams = await Promise.all(
      streams.map(async (stream) => {
        try {
          // Analizar sentimiento del contenido
          const document = {
            content: stream.content,
            type: 'PLAIN_TEXT',
          };

          const [result] = await client.analyzeSentiment({ document });
          const sentiment = result.documentSentiment;

          // Clasificar entidades
          const [entitiesResult] = await client.analyzeEntities({ document });
          const entities = entitiesResult.entities.map(entity => ({
            name: entity.name,
            type: entity.type,
            salience: entity.salience,
          }));

          return {
            ...stream,
            sentiment: {
              score: sentiment.score, // -1 a 1
              magnitude: sentiment.magnitude, // 0+
              label: sentiment.score > 0.2 ? 'positivo' :
                     sentiment.score < -0.2 ? 'negativo' : 'neutral'
            },
            entities: entities.slice(0, 5), // Top 5 entidades
            processed: true
          };
        } catch (error) {
          console.error('Error processing stream:', error);
          return {
            ...stream,
            sentiment: { score: 0, magnitude: 0, label: 'error' },
            entities: [],
            processed: false
          };
        }
      })
    );

    res.status(200).json({ processedStreams });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}