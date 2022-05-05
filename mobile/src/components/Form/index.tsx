import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

import { styles } from './styles';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [comment, setComment] = useState('');
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const handleScreenshot = async () => {
        const capture = await captureScreen({
            format: 'jpg',
            quality: 0.8
        });
        setScreenshot(capture);
    }

    const handleScreenshotRemove = () => {
        setScreenshot(null);
    }

    const handleSendFeedback = async () => {
        if (isSendingFeedback || comment.trim().length === 0) {
            return;
        }
        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot ? await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }) : null;
        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                comment,
                screenshot: `data:image/png;base64,${screenshotBase64}`
            });
            onFeedbackSent();
        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft 
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>
            <TextInput 
                autoCorrect={false}
                multiline
                style={styles.input}
                placeholder="Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={setComment}
            />
            <View style={styles.footer}>
                <ScreenshotButton 
                    screenshot={screenshot} 
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                />
                <Button 
                    onPress={handleSendFeedback} 
                    isLoading={isSendingFeedback} 
                    disabled={comment.trim().length === 0}
                />
            </View>
        </View>
    );
}
