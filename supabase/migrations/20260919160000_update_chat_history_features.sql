ALTER TABLE chat_sessions
ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN IF NOT EXISTS share_id UUID UNIQUE;

-- Autoriser la lecture publique des sessions partagées
CREATE POLICY "Public can view shared sessions" 
ON chat_sessions 
FOR SELECT 
USING (share_id IS NOT NULL);

-- Autoriser la lecture publique des messages associés aux sessions partagées
CREATE POLICY "Public can view shared messages" 
ON chat_messages 
FOR SELECT 
USING (session_id IN (SELECT id FROM chat_sessions WHERE share_id IS NOT NULL));
