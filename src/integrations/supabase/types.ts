export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      survey_responses: {
        Row: {
          ba_clarity_rating: number | null
          ba_collaboration_rating: number | null
          ba_documentation_rating: number | null
          ba_improvements: string | null
          ba_response_rating: number | null
          ba_satisfaction_rating: number | null
          ba_strengths: string | null
          content_collaboration_rating: number | null
          content_improvements: string | null
          content_quality_rating: number | null
          content_response_rating: number | null
          content_satisfaction_rating: number | null
          content_strengths: string | null
          created_at: string | null
          design_communication_rating: number | null
          design_creativity_rating: number | null
          design_delivery_rating: number | null
          design_improvements: string | null
          design_requirements_rating: number | null
          design_satisfaction_rating: number | null
          design_strengths: string | null
          dev_improvements: string | null
          dev_proactive_rating: number | null
          dev_requirements_rating: number | null
          dev_satisfaction_rating: number | null
          dev_solutions_rating: number | null
          dev_strengths: string | null
          dev_support_rating: number | null
          id: string
          inteam_clarity_rating: number | null
          inteam_growth_rating: number | null
          inteam_improvements: string | null
          inteam_respect_rating: number | null
          inteam_satisfaction_rating: number | null
          inteam_strengths: string | null
          inteam_support_rating: number | null
          is_single_member: boolean | null
          name: string | null
          okr_implementation_rating: number | null
          okr_personal_rating: number | null
          okr_process_rating: number | null
          okr_team_awareness_rating: number | null
          okr_understanding_rating: number | null
          qa_collaboration_rating: number | null
          qa_communication_rating: number | null
          qa_improvements: string | null
          qa_satisfaction_rating: number | null
          qa_strengths: string | null
          qa_testing_rating: number | null
          qa_timing_rating: number | null
          self_collaboration_rating: number | null
          self_improvement_rating: number | null
          self_proactive_rating: number | null
          self_satisfaction_rating: number | null
          self_timely_response_rating: number | null
          team: Database["public"]["Enums"]["team_type"] | null
          wsz_goals_rating: number | null
          wsz_meetings_rating: number | null
          wsz_next_quarter_changes: string | null
          wsz_process_improvements: string | null
          wsz_process_rating: number | null
          wsz_product_understanding_rating: number | null
          wsz_satisfaction_rating: number | null
        }
        Insert: {
          ba_clarity_rating?: number | null
          ba_collaboration_rating?: number | null
          ba_documentation_rating?: number | null
          ba_improvements?: string | null
          ba_response_rating?: number | null
          ba_satisfaction_rating?: number | null
          ba_strengths?: string | null
          content_collaboration_rating?: number | null
          content_improvements?: string | null
          content_quality_rating?: number | null
          content_response_rating?: number | null
          content_satisfaction_rating?: number | null
          content_strengths?: string | null
          created_at?: string | null
          design_communication_rating?: number | null
          design_creativity_rating?: number | null
          design_delivery_rating?: number | null
          design_improvements?: string | null
          design_requirements_rating?: number | null
          design_satisfaction_rating?: number | null
          design_strengths?: string | null
          dev_improvements?: string | null
          dev_proactive_rating?: number | null
          dev_requirements_rating?: number | null
          dev_satisfaction_rating?: number | null
          dev_solutions_rating?: number | null
          dev_strengths?: string | null
          dev_support_rating?: number | null
          id?: string
          inteam_clarity_rating?: number | null
          inteam_growth_rating?: number | null
          inteam_improvements?: string | null
          inteam_respect_rating?: number | null
          inteam_satisfaction_rating?: number | null
          inteam_strengths?: string | null
          inteam_support_rating?: number | null
          is_single_member?: boolean | null
          name?: string | null
          okr_implementation_rating?: number | null
          okr_personal_rating?: number | null
          okr_process_rating?: number | null
          okr_team_awareness_rating?: number | null
          okr_understanding_rating?: number | null
          qa_collaboration_rating?: number | null
          qa_communication_rating?: number | null
          qa_improvements?: string | null
          qa_satisfaction_rating?: number | null
          qa_strengths?: string | null
          qa_testing_rating?: number | null
          qa_timing_rating?: number | null
          self_collaboration_rating?: number | null
          self_improvement_rating?: number | null
          self_proactive_rating?: number | null
          self_satisfaction_rating?: number | null
          self_timely_response_rating?: number | null
          team?: Database["public"]["Enums"]["team_type"] | null
          wsz_goals_rating?: number | null
          wsz_meetings_rating?: number | null
          wsz_next_quarter_changes?: string | null
          wsz_process_improvements?: string | null
          wsz_process_rating?: number | null
          wsz_product_understanding_rating?: number | null
          wsz_satisfaction_rating?: number | null
        }
        Update: {
          ba_clarity_rating?: number | null
          ba_collaboration_rating?: number | null
          ba_documentation_rating?: number | null
          ba_improvements?: string | null
          ba_response_rating?: number | null
          ba_satisfaction_rating?: number | null
          ba_strengths?: string | null
          content_collaboration_rating?: number | null
          content_improvements?: string | null
          content_quality_rating?: number | null
          content_response_rating?: number | null
          content_satisfaction_rating?: number | null
          content_strengths?: string | null
          created_at?: string | null
          design_communication_rating?: number | null
          design_creativity_rating?: number | null
          design_delivery_rating?: number | null
          design_improvements?: string | null
          design_requirements_rating?: number | null
          design_satisfaction_rating?: number | null
          design_strengths?: string | null
          dev_improvements?: string | null
          dev_proactive_rating?: number | null
          dev_requirements_rating?: number | null
          dev_satisfaction_rating?: number | null
          dev_solutions_rating?: number | null
          dev_strengths?: string | null
          dev_support_rating?: number | null
          id?: string
          inteam_clarity_rating?: number | null
          inteam_growth_rating?: number | null
          inteam_improvements?: string | null
          inteam_respect_rating?: number | null
          inteam_satisfaction_rating?: number | null
          inteam_strengths?: string | null
          inteam_support_rating?: number | null
          is_single_member?: boolean | null
          name?: string | null
          okr_implementation_rating?: number | null
          okr_personal_rating?: number | null
          okr_process_rating?: number | null
          okr_team_awareness_rating?: number | null
          okr_understanding_rating?: number | null
          qa_collaboration_rating?: number | null
          qa_communication_rating?: number | null
          qa_improvements?: string | null
          qa_satisfaction_rating?: number | null
          qa_strengths?: string | null
          qa_testing_rating?: number | null
          qa_timing_rating?: number | null
          self_collaboration_rating?: number | null
          self_improvement_rating?: number | null
          self_proactive_rating?: number | null
          self_satisfaction_rating?: number | null
          self_timely_response_rating?: number | null
          team?: Database["public"]["Enums"]["team_type"] | null
          wsz_goals_rating?: number | null
          wsz_meetings_rating?: number | null
          wsz_next_quarter_changes?: string | null
          wsz_process_improvements?: string | null
          wsz_process_rating?: number | null
          wsz_product_understanding_rating?: number | null
          wsz_satisfaction_rating?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      team_type:
        | "DEV"
        | "BA"
        | "CONTENT_SEO"
        | "SEO"
        | "DESIGN"
        | "QA"
        | "MKT"
        | "OTHER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      team_type: [
        "DEV",
        "BA",
        "CONTENT_SEO",
        "SEO",
        "DESIGN",
        "QA",
        "MKT",
        "OTHER",
      ],
    },
  },
} as const
